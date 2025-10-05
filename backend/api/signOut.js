import sbs from "../libs/createAuth.js";
export default async ({ access_token }) => {
  try {
    const { data, error } = await sbs.auth.admin.signOut(access_token);
    if (!error) {
      console.log("successfully signed out!");
      return { success: true, data };
    } else {
      console.log("couldnt sign out :(", error);
      return { success: false, error: error.message };
    }
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
};
