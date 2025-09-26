import rzp from "../libs/rzpClient.js";
import crypto from "crypto";
import sbs from "../libs/createAuth.js";

async function paymentComplete({
  razorpay_payment_id,
  razorpay_order_id,
  access_token,
}) {
  const paymentDetail = await rzp.payments.fetch(razorpay_payment_id);
  const orderDetail = await rzp.orders.fetch(razorpay_order_id);
  console.log({ paymentDetail, orderDetail, access_token });
  const { data: buyerData, error: buyerError } = await sbs.auth.getUser(
    access_token
  );
  if (buyerError) {
    console.log(buyerError);
    return { message: buyerError.message, success: false };
  }
  const { data: itemData, error: itemError } = await sbs
    .from("items")
    .select(
      `*,
          users!items_user_id_fkey1(
          upi_name,
          upi_id,
          phone_number,
          email,
          ifsc,
          account_number
          )`
    )
    .eq("id", paymentDetail.notes.id);

  console.log({ itemData, users: itemData[0].users });
  try {
    const { data: payoutData, error: payoutError } = await sbs
      .from("seller_payouts")
      .insert({
        seller_name: `${itemData[0].users.upi_name}`,
        seller_contact: {
          phone: `${itemData[0].users.phone_number}`,
          email: `${itemData[0].users.email}`,
        },
        payout_method: `${paymentDetail.method}`,
        amount_due: `${orderDetail.amount_due}`,
        amount_paid_paise: `${orderDetail.amount_paid}`,
        buyer_transaction_ref: `${orderDetail.id}`,
        payout_status:
          paymentDetail.status === "captured"
            ? "Paid"
            : paymentDetail.status === "failed"
            ? "Failed"
            : "Pending",
        payout_datetime: `${new Date(
          paymentDetail.created_at * 1000
        ).toISOString()}`,
        upi_id: `${itemData[0].users.upi_id}`,
        payment_id: `${razorpay_payment_id}`,
        order_id: `${razorpay_order_id}`,
        buyer_contact: {
          phone: `${paymentDetail.contact}`,
          email: `${paymentDetail.email}`,
        },
        buyer_id: `${buyerData.user.id}`,
      })
      .select();
    if (payoutData && !payoutError) {
      const { data, error } = await sbs
        .from("items")
        .update({
          // id: paymentDetail.notes.id,
          bought_by: `${buyerData.user.id}`,
        })
        .eq("id", `${paymentDetail.notes.id}`)
        .select();
      console.log({ itemData: data });
      if (error) {
        console.log(error);
        return { message: error.message, success: false };
      }
    }
  } catch (e) {
    console.log("e ->", e);
    return { success: false, message: e };
  }
}

export default async ({ result, access_token }) => {
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
      return await paymentComplete({
        razorpay_order_id,
        razorpay_payment_id,
        access_token,
      });
    }
    else {
      return { success: false, message: "Payment Incomplete." };
    }
  } catch (err) {
    console.error("Payment Verification Error:", err);
    return { success: false, message: "Payment not Verified." };
  }
};
