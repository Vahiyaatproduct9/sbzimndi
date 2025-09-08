import rzp from "../libs/rzpClient.js";
import crypto from "crypto";

function paymentComplete() {
  console.log("Payment COmplete!");
}

export default async (result) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = result;
  try {
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.log("error");
      return {
        success: false,
        message: "Missing required payment parameters.",
      };
    }
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");
    if (generated_signature !== razorpay_signature) {
      return { success: false, message: "Signature Mismatch." };
    }
    const payment = await rzp.payments.fetch(razorpay_payment_id);
    if (payment.status === "captured") {
      paymentComplete();
      return { success: true, message: "Payment Complete." };
    } else {
      return { success: false, message: "Payment Incomplete." };
    }
  } catch (err) {
    console.error("Payment Verification Error:", err);
    return { success: false, message: "Payment not Verified." };
  }
};
