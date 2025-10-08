import sb from "../libs/createClient.js";
export default async function ({ email, password }) {
  try {
    const { data, error } = await sb.auth.signInWithPassword({
      email,
      password,
    });
    if (data && !error) {
      console.log(data);
      return {
        refresh_token: data.session.refresh_token,
        access_token: data.session.access_token,
        success: true,
        message: "Signed in Successfully.",
      };
    } else {
      console.log("signin error -->", error);
      return {
        ...error,
        success: false,
        message: error.message || "Something went wrong :(",
      };
    }
  } catch (e) {
    console.log("Try & Catch Error", e);
    return { error: e, success: false, message: "Try and catch Error" };
  }
}
