import sb from "../libs/createClient.js";
import rzpClient from "../libs/rzpClient.js";
export default async function ({ id }) {
  try {
    const { data, error } = await sb
      .from("items")
      .select()
      .eq("id", id)
      .single();
    if (error) {
      console.log({ error });
      return { error: "Item not found", status: 404 };
    }
    const { name, price, description, expires_in } = data;
    try {
      console.log(process.env.RAZORPAY_KEY_ID);
      const order = await rzpClient.orders.create({
        amount: price * 100,
        currency: "INR",
        receipt: `receipt_order`,
        notes: {
          Expires: expires_in,
        },
      });
      return {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount * 100,
        currency: order.currency,
        name,
        description,
        order_id: order.id,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return { error: "Failed to create order", status: 500 };
    }
  } catch (e) {
    return { error: e, status: 500 };
  }
}
