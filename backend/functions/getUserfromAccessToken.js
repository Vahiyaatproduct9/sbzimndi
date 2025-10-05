import sbs from "../libs/createAuth.js";
export default async (access_token) => {
  try {
    const { data, error } = await sbs.auth.getUser(access_token);
    if (!error) {
      return { ...data.user, success: true, error };
    } else return { error, success: false, id: null };
  } catch (e) {
    return { success: false, error: e, id: null };
  }
};
