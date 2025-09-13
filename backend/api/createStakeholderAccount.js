import rzp from "../libs/rzpClient.js";
export default async ({
  sb_account_id,
  phone,
  linkedAccountId,
  name,
  email,
  street,
  city,
  state,
  postal_code,
  country,
  pan,
  file: { aadhar_front, personal_pan },
  bank_proof,
}) => {
  const stakeholderAccount = await rzp.stakeholders.create(linkedAccountId, {
    name,
    email,
    percentage_ownership: 100,
    relationship: {
      director: true,
      executive: true,
    },
    phone,

    addresses: {
      residential: {
        street,
        city,
        state,
        postal_code,
        country,
      },
    },
    kyc: {
      pan,
    },
    notes: {
      sb_account_id,
    },
  });
  if (stakeholderAccount.error) {
    await rzp.accounts.delinkProduct(linkedAccountId, "route");
    return { success: false, message: stakeholderAccount.error.description };
  }
  let docs_uri = {
    aadhar_front: null,
    personal_pan: null,
    bank_proof: null,
  };
  Object.keys(file).forEach(async (key) => {
    const formData = {
      file: {
        value: file.key,
        options: {
          filename: `${key}.png`,
          contentType: null,
        },
      },
      document_type: key,
    };

    const stakeHolderDocuments = await rzp.stakeholders.uploadStakeholderDoc(
      linkedAccountId,
      stakeholderAccount.id,
      formData
    );
    if (stakeHolderDocuments)
      docs_uri.key = stakeHolderDocuments.individual_proof_of_address;
  });
  const accountBankProof = await rzp.accounts.uploadAccountDoc(
    linkedAccountId,
    {
      file: {
        value: bank_proof,
        options: {
          filename: "bank_proof.png",
          contentType: null,
        },
      },
      document_type: "cancelled_cheque",
    }
  );
  if (accountBankProof)
    docs_uri.bank_proof =
      accountBankProof.business_proof_of_identification[0].url;
  return {
    stakeholderAccount,
    docs_uri,
    status:
      docs_uri.aadhar_front !== null &&
      docs_uri.bank_proof !== null &&
      docs_uri.personal_pan !== null
        ? true
        : false,
  };
};
