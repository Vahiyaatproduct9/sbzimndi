import rzp from "../libs/rzpClient.js";
import crypto from "crypto";
import sbs from "../libs/createAuth.js";

async function paymentComplete({
  razorpay_payment_id,
  razorpay_order_id,
  access_token,
}) {
  try {
    const paymentDetail = await rzp.payments.fetch(razorpay_payment_id);
    const orderDetail = await rzp.orders.fetch(razorpay_order_id);
    console.log("[paymentComplete] fetched", { paymentDetail, orderDetail });

    const { data: buyerData, error: buyerError } = await sbs.auth.getUser(
      access_token
    );
    if (buyerError || !buyerData?.user) {
      console.error("[paymentComplete] buyer auth error:", buyerError);
      return {
        success: false,
        message: buyerError?.message || "Failed to fetch buyer",
      };
    }

    const itemId = paymentDetail?.notes?.id;
    if (!itemId) {
      console.error("[paymentComplete] missing item id in notes");
      return { success: false, message: "Missing item ID in payment notes" };
    }

    const { data: itemData, error: itemError } = await sbs
      .from("items")
      .select(
        `*, users!items_user_id_fkey1(
          upi_name, upi_id, phone_number, email, ifsc, account_number
        )`
      )
      .eq("id", itemId)
      .limit(1);

    if (itemError || !itemData?.length) {
      console.error("[paymentComplete] failed to fetch item:", itemError);
      return {
        success: false,
        message: itemError?.message || "Item not found",
      };
    }

    const seller = itemData[0].users;
    const { data: payoutData, error: payoutError } = await sbs
      .from("seller_payouts")
      .insert({
        seller_name: seller.upi_name,
        seller_contact: {
          phone: seller.phone_number,
          email: seller.email,
        },
        payout_method: paymentDetail.method,
        amount_due: orderDetail.amount_due,
        amount_paid_paise: orderDetail.amount_paid,
        buyer_transaction_ref: orderDetail.id,
        payout_status:
          paymentDetail.status === "captured"
            ? "Paid"
            : paymentDetail.status === "failed"
            ? "Failed"
            : "Pending",
        payout_datetime: new Date(
          paymentDetail.created_at * 1000
        ).toISOString(),
        upi_id: seller.upi_id,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        buyer_contact: {
          phone: paymentDetail.contact,
          email: paymentDetail.email,
        },
        buyer_id: buyerData.user.id,
      })
      .select();

    if (payoutError) {
      console.error("[paymentComplete] payout insert error:", payoutError);
      return { success: false, message: payoutError.message };
    }

    const { data: updatedItem, error: updateError } = await sbs
      .from("items")
      .update({ bought_by: buyerData.user.id })
      .eq("id", itemId)
      .select();

    if (updateError) {
      console.error("[paymentComplete] item update error:", updateError);
      return { success: false, message: updateError.message };
    }

    console.log("[paymentComplete] success", { updatedItem, payoutData });
    return { success: true, message: "Payment processed successfully" };
  } catch (err) {
    console.error("[paymentComplete] unexpected error:", err);
    return {
      success: false,
      message: "Unexpected error in payment completion",
    };
  }
}

export default async ({ result, access_token }) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      result || {};
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.error("[verifyPayment] missing params");
      return {
        success: false,
        message: "Missing required payment parameters.",
      };
    }

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      console.error("[verifyPayment] signature mismatch");
      return { success: false, message: "Signature Mismatch." };
    }

    const payment = await rzp.payments.fetch(razorpay_payment_id);
    console.log("[verifyPayment] payment fetched", { status: payment.status });

    if (payment.status === "captured") {
      return await paymentComplete({
        razorpay_order_id,
        razorpay_payment_id,
        access_token,
      });
    }

    return { success: false, message: "Payment Incomplete." };
  } catch (err) {
    console.error("[verifyPayment] Payment Verification Error:", err);
    return { success: false, message: "Payment not Verified." };
  }
};
