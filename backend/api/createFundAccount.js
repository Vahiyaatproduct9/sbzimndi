import rzp from "../libs/rzpClient.js";
export default async ({ linkedAccountId, ifsc, account_number, name }) => {
  const fundAccount = await rzp.fundAccount.create({
    contact_id: linkedAccountId,
    bank_account: {
      name,
      account_number,
      ifsc,
    },
    account_type: "bank_account",
  });
  return fundAccount;
};
