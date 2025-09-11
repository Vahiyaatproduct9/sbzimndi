import supabase from "../libs/createClient.js";
import sbs from "../libs/createAuth.js";
import rzp from "../libs/rzpClient.js";
export default async ({
  name,
  email,
  password,
  phone,
  location: { lat, long, acc },
  ifsc,
  accountNumber,
}) => {
  const { data: createUserData, error: createUserError } =
    await sbs.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      phone,
      user_metadata: {
        ifsc,
        account_number: accountNumber,
      },
    });
  if (createUserError) {
    console.log({ createUserError });
    return { success: false, message: createUserError.message };
  }
  const res = await fetch(
    `https://us1.locationiq.com/v1/reverse?lat=${lat}2&lon=${long}&format=json&key=${process.env.LOCATION_IQ_ACCESS_TOKEN}`,
    {
      method: "GET",
      headers: { accept: "application/json" },
    }
  ).then(async (res) => await res.json());
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
          street1: `${res.address.neighbourhood || ""}`,
          street2: `${res.address.road || ""}`,
          city: `${
            res.address.city || res.address.town || res.address.village || ""
          }`,
          state: `${res.address.state || ""}`,
          postal_code: `${res.address.postcode || ""}`,
          country: "IN",
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
  if (createUserData.user) {
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
          rzp_merchant_id: Merchant.id,
          rzp_merchant_status: Merchant.status,
        })
        .select();
      if (data && !error) {
        console.log(data);
        return { success: true, message: "User created successfully" };
      }
      console.log(error);
      return { success: false, message: error.message };
    } else {
      console.log("error ---> ", authError, passErr);
      return { success: false, message: authError.message || passErr.message };
    }
  } else {
    return { success: false, message: createUserError.message };
  }
};
