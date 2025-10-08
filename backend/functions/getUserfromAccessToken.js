import sbs from "../libs/createAuth.js";
export default async (access_token) => {
  if (!access_token || access_token.length === 0)
    return { success: false, id: null, error: "No Access Token Provided." };
  try {
    const { data, error } = await sbs.auth.getUser(access_token);
    if (!error) {
      return { ...data.user, success: true, error };
    } else {
      console.log("getUser Error: ", error);
      return { error, success: false, id: null };
    }
  } catch (e) {
    return { success: false, error: e, id: null };
  }
};
