import sbs from "../libs/createAuth.js";
import getUserfromAccessToken from "./getUserfromAccessToken.js";
export default async ({ access_token, notification_on }) => {
  console.log("notification turned ", notification_on);
  if (!access_token) {
    return {
      success: false,
      id: null,
    };
  }
  const { success, id } = await getUserfromAccessToken(access_token);
  if (!success)
    return {
      success: false,
      message: "Invalid Access Token.",
    };

  const { error } = await sbs
    .from("users")
    .update({
      notification_on,
    })
    .eq("id", id);
  if (error)
    return {
      success: false,
      message: "SBS error occured",
      error,
    };

  return {
    success: true,
    message: null,
    error: null,
  };
};
