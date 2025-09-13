import supabase from "../libs/createClient.js";
import sbs from "../libs/createAuth.js";
import rzp from "../libs/rzpClient.js";
import createStakeholderAccount from "./createStakeholderAccount.js";
import getUserLocation from "./getUserLocation.js";
export default async ({
  verified,
  name,
  email,
  password,
  phone,
  location: { lat, long, acc },
  ifsc,
  accountNumber,
  pan,
  aadhar_front,
  personal_pan,
  bank_proof,
}) => {
  try {
    const { data: createUserData, error: createUserError } =
      await sbs.auth.admin.createUser({
        email,
        password,
        email_confirm: false,
        phone,
        user_metadata: {
          ifsc: ifsc || null,
          account_number: accountNumber || null,
          pan: pan || null,
          full_name: name,
          location: { lat, long, acc },
        },
      });
    if (createUserError) {
      console.log({ createUserError });
      return { success: false, message: createUserError.message };
    }
    if (verified === false) {
      const { error } = await sbs.from("users").insert({
        id: createUserData.user.id,
        full_name: name,
        email,
        phone_number: phone,
        password,
        latitude: lat,
        longitude: long,
        accuracy: acc,
      });
      if (!error)
        return { success: true, message: "User created successfully" };
      else console.log(error);
    }
    const {
      address: {
        neighbourhood,
        road,
        city,
        town,
        village,
        state,
        postcode,
        country: country_code,
      },
    } = await getUserLocation({ lat, long });
    console.log(res);
    const Merchant = await rzp.accounts.create({
      contact_name: name,
      legal_business_name: name,
      business_type: "individual",
      phone,
      email,
      reference_id: createUserData.user.id,
      profile: {
        category: "retail",
        subcategory: "groceries",
        description: "SbziMndi",
        addresses: {
          registered: {
            street1: `${neighbourhood || ""}`,
            street2: `${road || ""}`,
            city: `${city || town || village || ""}`,
            state: `${state || ""}`,
            postal_code: `${postcode || ""}`,
            country: `${country_code}`,
          },
        },
      },
      notes: {
        platform: "SbziMndi",
      },
    });
    console.log({ Merchant });
    if (Merchant.error) {
      const { error } = await sbs.auth.admin.deleteUser(createUserData.user.id);
      console.log({ error });
      return { success: false, message: Merchant.error.description };
    }

    // Create a Stackeholder Account with the Merchant Linked Account Id
    const { stakeholderAccount, docs_uri, status } =
      await createStakeholderAccount({
        sb_account_id: createUserData.user.id,
        phone,
        linkedAccountId: Merchant.id,
        name,
        email,
        city,
        state,
        postal_code: postcode,
        country: country_code.toString().toUpperCase() || country_code,
        pan,
        file: {
          aadhar_front,
          personal_pan,
        },
        bank_proof,
      });
    console.log({ stakeholderAccount, status });
    if (status !== true) {
      const { error } = await sbs.auth.admin.deleteUser(createUserData.user.id);
      console.log({ error });
      return {
        success: false,
        message: "Failed to create stakeholder account",
      };
    }

    if (createUserData.user && Merchant.id && stakeholderAccount.id) {
      const { error: authError } = await supabase.auth.signInWithOtp({ email });
      if (!authError || !passErr) {
        const { data, error } = await supabase
          .from("users")
          .insert({
            id: createUserData.user.id,
            full_name: name,
            email,
            phone_number: phone,
            password,
            latitude: lat,
            longitude: long,
            accuracy: acc,
            ifsc,
            account_number: accountNumber,
            rzp_linked_account_id: Merchant.id,
            rzp_merchant_status: Merchant.status,
            rzp_stakeholder_account_id: stakeholderAccount.id,
            aadhar_front: docs_uri.aadhar_front,
            bank_proof: docs_uri.bank_proof,
            personal_pan: docs_uri.personal_pan,
          })
          .select();
        if (data && !error) {
          console.log(data);
          return {
            success: true,
            message: "Verified User created successfully",
          };
        }
        console.log(error);
        return { success: false, message: error.message };
      } else {
        console.log("error ---> ", authError, passErr);
        return {
          success: false,
          message: authError.message || passErr.message,
        };
      }
    } else {
      return { success: false, message: createUserError.message };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: "try & catch error" };
  }
};
