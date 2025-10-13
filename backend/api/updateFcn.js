import sb from "../libs/createClient.js";
import sbs from "../libs/createAuth.js";
export default async ({ access_token, user_id, fcm_token }) => {
  console.log("running update fcm");
  async function runFunction(user_id) {
    const { error } = await sb
      .from("users")
      .update({
        fcm_token,
      })
      .eq("id", user_id);
    if (!error) {
      console.log("updated fcm token!");
      return { success: true, data, message: "Success" };
    } else
      return { success: false, error, message: "Couldn't update FCM Token" };
  }
  try {
    if (user_id) {
      return await runFunction(user_id)
    }
    const { data: userData, error: userError } = await sbs.auth.getUser(
      access_token
    );
    if (userError) {
      console.log("Error:", userError);
      return { success: false, error: userError, message: "Couldnt find user" };
    }
  } catch (e) {
    return {
      success: true,
      error: e,
    };
  }
};
