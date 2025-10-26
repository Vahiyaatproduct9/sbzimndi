import sb from "../libs/createClient.js";
import sbs from "../libs/createAuth.js";
import { configDotenv } from "dotenv";
import getUserfromAccessToken from "../functions/getUserfromAccessToken.js";
configDotenv();
export default async function addPost({ photo, info }) {
  console.log("uploading post...");
  try {
    const access_token = await info.access_token;
    const { success, id, error } = await getUserfromAccessToken(access_token);
    if (!success) {
      console.log("no access token.");
      return {
        success: false,
        message: "No Access Token found!",
        error,
      };
    }
    const fileName = `${id}/${Date.now()}${photo.originalName || ".png"}`;
    const { error: imgError } = await sbs.storage
      .from("uploads")
      .upload(fileName, photo.buffer, {
        contentType: photo.mimetype,
      });
    if (imgError) {
      console.log("Image Error: ", imgError);
      return {
        success: false,
        message: "Coudln't upload Image.",
        error: imgError,
      };
    }
    const { error: itemError } = await sb.from("items").insert({
      name: info.name,
      description: info.desc,
      quantity: info.quantity,
      price: info.price,
      expiry_date: info.expiryDate,
      latitude: info.latitude,
      longitude: info.longitude,
      accuracy: info.accuracy,
      image_url: `${process.env.supabaseUrl}/storage/v1/object/public/uploads/${fileName}`,
      user_id: id,
      location: `POINT(${info.latitude} ${info.longitude})`,
    });
    if (itemError) {
      console.log("item error:", itemError);
      return {
        success: false,
        error: itemError,
        message: "Couldn't upload Data.",
      };
    }
    return {
      success: true,
      message: null,
      error: null,
    };
  } catch (e) {
    console.log("❌ -->", e);
    return {
      success: false,
      error: e,
      message: "Internal Server Error",
    };
  }
}
