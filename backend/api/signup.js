import supabase from "../libs/createClient.js";
import sbs from "../libs/createAuth.js";
import rzp from "../libs/rzpClient.js";
import createStakeholderAccount from "./createStakeholderAccount.js";
import getUserLocation from "./getUserLocation.js";
function w(i) {
  return console.log(i);
}
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
  console.log("Executing signup function");
  let id = "";
  let lnid = "";
  email = `grishma${Date.now()}@example.com`;
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
    id = createUserData.user.id;
    console.log("past line 36 - createUser");
    if (createUserError) {
      console.log({ createUserError });
      return { success: false, message: createUserError.message };
    }
    console.log("creating public.users ");
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
    w("created Publlic Userazs, getting user location");
    const { address, display_name } = await getUserLocation({ lat, long });
    const { street1, street2, city, state, postal_code, country } = address;
    console.log(address);
    w("FInished location, creating linked account");
    const Merchant = await rzp.accounts.create({
      email,
      phone: `${phone}`,
      type: "route",
      reference_id: `${Date.now()}` || `${pan}`,
      legal_business_name: name,
      business_type: "individual",
      contact_name: name,
      profile: {
        category: "ecommerce",
        subcategory: "non_durable_goods",
        business_model:
          "SbziMndi where people sells and buys 'soon to be expired' goods at lower prices.",
        addresses: {
          registered: {
            street1,
            street2,
            city,
            state,
            postal_code,
            country,
          },
        },
      },
      notes: {
        platform: "SbziMndi",
      },
    });
    lnid = Merchant.id;
    console.log({ Merchant });
    if (Merchant.error) {
      console.log("Merchant Error", { error });
      return { success: false, message: Merchant.error.description };
    }

    // Create a Stackeholder Account with the Merchant Linked Account Id
    w("creating stakeholder account");
    const { stakeholderAccount, docs_uri, status } =
      await createStakeholderAccount({
        sb_account_id: createUserData.user.id,
        phone,
        linkedAccountId: Merchant.id,
        name,
        email,
        street: display_name
          ? `${display_name}`
          : `${street1}, ${street2}, ${state}, ${country}`,
        city,
        state,
        postal_code,
        country,
        pan,
        file: {
          aadhar_front,
          personal_pan,
        },
        bank_proof,
      });
    w("line 2", { stakeholderAccount, status });
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
    const { error } = await sbs.auth.admin.deleteUser(id);
    await rzp.accounts.delete(lnid);
    if (!error) w("Deleted user");
    return { success: false, message: "try & catch error" };
  }
};
