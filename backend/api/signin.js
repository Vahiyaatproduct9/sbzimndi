import sb from "../libs/createClient.js";
export default async function ({ email, password }) {
  const { data, error } = await sb.auth.signInWithPassword({
    email,
    password,
  });
  console.log("signin error -->", error);
  if (data && !error) {
    console.log(data);
    return {
      refresh_token: data.session.refresh_token,
      access_token: data.session.access_token,
      success: true,
      message: "Signed in Successfully.",
    };
  } else {
    return {
      ...error,
      success: false,
      message: error.message || "Something went wrong :(",
    };
  }
}
