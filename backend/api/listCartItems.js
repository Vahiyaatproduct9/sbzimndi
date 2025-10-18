import getUserfromAccessToken from "../functions/getUserfromAccessToken.js";
import sbs from "../libs/createClient.js";
export default ({ access_token, user_id }) => {
  async function getUser() {
    const { success, id } = await getUserfromAccessToken(access_token);
    if (success) return id;
    return null;
  }
  async function runFunction(id) {
    try {
      console.log("id: ", id);
      const { data, error } = await sbs
        .from("items")
        .select()
        .eq("bought_by", id);
      console.log("data from lstCrtitm: ", data);
      if (!error) {
        console.log("no error while fetching orders.");
        return {
          success: true,
          data,
          error,
          message: null,
        };
      } else {
        return {
          success: false,
          data: null,
          error,
          message: "Couldn't fetch orders.",
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        error,
        message: "Internal Server Error.",
      };
    }
  }
  return {
    list: async () => {
      if (user_id) {
        return await runFunction(user_id);
      } else if (access_token) {
        const id = await getUser(access_token);
        if (id) {
          return await runFunction(id);
        }
      }
    },
  };
};
