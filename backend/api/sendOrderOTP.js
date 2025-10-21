import sbs from "../libs/createAuth.js";
import crypto from "crypto-js";
import sendEmail from "../functions/sendEmail.js";
import orderOTP from "../mailTemplates/orderOTP.js";
import { configDotenv } from "dotenv";
configDotenv({
  path: "../.env",
});
export default async ({ item_id }) => {
  const generated_num = Math.floor(100000 + Math.random() * 900000).toString();
  const encrypted_gn = crypto.AES.encrypt(
    generated_num,
    process.env.CRYPTO_ENCRYPTION_KEY
  ).toString();
  const { error: insertError } = await sbs
    .from("items")
    .update({
      order_otp: encrypted_gn,
    })
    .eq("id", item_id);
  if (insertError) {
    console.log("Error inserting OTP: ", insertError);
    return {
      success: false,
      data: null,
      error: insertError,
      message: insertError.message,
    };
  }
  const { data, error } = await sbs
    .from("items")
    .select(
      `*,
        items_user_id_fkey1(*),
        items_bought_by_fkey(*)`
    )
    .eq("id", item_id)
    .single();
  console.log("data in sendOrderOTP:", data, error);
  if (error)
    return {
      success: false,
      data: null,
      error,
      message: error.message,
    };
  const sender_user = data.items_user_id_fkey1; // seller account
  const reciever_user = data.items_bought_by_fkey; // buyer account
  const info = await sendEmail({
    to: `${reciever_user.email}`,
    subject: "Order OTP",
    body: orderOTP({
      user_name: sender_user.full_name,
      OTP: generated_num,
      item_name: data.name,
      price: data.price,
    }),
  });
  console.log("info in email:", info);
  const success = info.response.split(" ").includes("OK");
  return { success, message: success ? "OTP sent!" : "Server Error!" };
};
