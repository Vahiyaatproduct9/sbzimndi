import sb from "../libs/createClient.js";
export default async function (refresh_token) {
  const { data, error } = await sb.auth.refreshSession({ refresh_token });
  if (error) {
    console.log("Error while refreshing token: ", error);
    return {
      success: false,
      error,
      data: null,
      message: error.message,
    };
  }
  console.log("Refreshing token...");
  return {
    success: true,
    data,
    error,
    message: null,
  };
}
