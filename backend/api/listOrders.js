import getUserfromAccessToken from "../functions/getUserfromAccessToken.js";
import sbs from "../libs/createAuth.js";
export default async (access_token) => {
  if (!access_token)
    return { success: false, data: null, error: "No Access Token Provided" };
  try {
    const { success, id } = await getUserfromAccessToken(access_token);
    if (success === true) {
      const { data: orderData, error: orderError } = await sbs
        .from("items")
        .select(
          `*,
          users!items_bought_by_fkey(id, full_name, latitude, longitude)`
        )
        .eq("user_id", id)
        .not("bought_by", "is", null);
      if (!orderError) {
        console.log("orderData: ", orderData);
        return {
          data: orderData,
          success: true,
          error: orderError?.message || null,
        };
      }
      return {
        data: orderData,
        error: orderError?.message || null,
        success: false,
      };
    }
  } catch (e) {
    return { data: null, error: "Try & Catch Error.", success: false };
  }
};
