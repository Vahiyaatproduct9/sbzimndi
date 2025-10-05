import sb from "../libs/createClient.js";
import sbs from "../libs/createAuth.js";
export default async ({ access_token, fcm_token }) => {
  console.log("running update fcm", access_token, fcm_token);
  try {
    const { data: userData, error: userError } = await sbs.auth.getUser(
      access_token
    );
    if (userError) {
      console.log("Error:", userError);
      return { success: false, error: userError, message: "Couldnt find user" };
    }
    const { error } = await sb
      .from("users")
      .update({
        fcm_token,
      })
      .eq("id", `${userData.user.id}`);
    if (!error) {
      console.log(
        "FCM updated for user",
        userData.user.user_metadata.full_name,
        "with fcm id",
        fcm_token,
        ":D."
      );
      return { success: true, data, message: "Success" };
    } else
      return { success: false, error, message: "Couldn't update FCM Token" };
  } catch (e) {
    return {
      success: true,
      error: e,
    };
  }
};
