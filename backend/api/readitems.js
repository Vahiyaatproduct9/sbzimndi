import sb from "../libs/createClient.js";

export async function read_items({ latitude, longitude }) {
  try {
    const { data, error } = await sb.rpc("find_nearest_items", {
      p_latitude: latitude,
      p_longitude: longitude,
      p_limit_count: 15,
    });
    if (!error) {
      return {
        data,
        error,
        success: true,
      };
    } else
      return {
        data,
        error,
        success: false,
      };
  } catch (error) {
    return { data, error, success: false };
  }
}
