import { configDotenv } from "dotenv";
import crypto from "crypto-js";
import sbs from "../libs/createAuth.js";
configDotenv({
  path: "../.env",
});
export default async ({ item_id, code }) => {
  try {
    const { data, error } = await sbs
      .from("items")
      .select("order_otp")
      .eq("id", item_id)
      .single();
    if (error) {
      console.log("Error while checking Order Code: ", error);
      return {
        success: false,
        message: error.message,
        error,
      };
    }
    const decrypted_code = crypto.AES.decrypt(
      data.order_otp,
      process.env.CRYPTO_ENCRYPTION_KEY
    ).toString(crypto.enc.Utf8);
    if (decrypted_code === code) {
      console.log("Transaction Verified for ", item_id);
      const { error: checkError } = await sbs
        .from("items")
        .update({
          complete: true,
        })
        .eq("id", item_id);
      if (error) {
        return {
          success: false,
          message: "Confirmation failed, try sending OTP again.",
          error: checkError,
        };
      }
      return {
        success: true,
        message: "Order Complete!",
      };
    }
    console.log("Invalid OTP");
    return {
      success: false,
      message: "Invalid Code.",
    };
  } catch (err) {
    return {
      success: false,
      message: "Internal Server Error.",
      error: err,
    };
  }
};
