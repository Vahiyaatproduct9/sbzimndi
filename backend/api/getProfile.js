import getUserfromAccessToken from "../functions/getUserfromAccessToken.js";
import sb from "../libs/createClient.js";
import updateFcn from "./updateFcn.js";

export default async ({ access_token, user_id, fcm_token }) => {
  console.log("recieved", { access_token, user_id, fcm_token });
  async function runFunction(user_id) {
    const { data: userData, error: userError } = await sb
      .from("users")
      .select(`*,items!items_user_id_fkey1(*)`)
      .eq("id", user_id) // users.id
      .single();

    if (!userError) {
      return { success: true, data: userData, error: null, message: null };
    } else {
      return { success: false, error, data: null, message: "Invalid User." };
    }
  }
  if (user_id) {
    // const { data, error } = await sb.auth.getUser(access_token);
    return await runFunction(user_id);
  } else if (access_token) {
    const { success, id } = await getUserfromAccessToken(access_token);
    if (success) {
      return await runFunction(id);
    }
    if (fcm_token) {
      await updateFcn({ user_id, fcm_token });
    }
  } else
    return {
      success: false,
      message: "No Access Token Provided.",
      items: null,
      error: null,
    };
};
