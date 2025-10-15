import sb from "../libs/createClient.js";

export default async function verifyWithOTP({ email, token }) {
  console.log(email, token);
  const {
    data: { session },
    error,
  } = await sb.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  if (!error && session) {
    console.log("no error in verifyWithOTP...");
    const data = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      success: true,
    };
    console.log(data);
    return data;
  }
  console.log(error);
  return false;
}
