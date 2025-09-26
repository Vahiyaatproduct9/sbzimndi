import sb from "./libs/createClient.js";
import sbs from "./libs/createAuth.js";
import rzp from "./libs/rzpClient.js";
const data = async () => {
  const { data, error } = await sb.from("test").select("*");
  const d = data;
  console.log(d);
};
import fuse from "fuse.js";

const deleteUser = async () => {
  const res = await sbs.auth.admin.listUsers();
  const ids = res.data.users.map((user) => user.id);
  console.log();
  // const id = "4a91fad1-2a34-4c1b-9915-27300386c9ba";
  for (const id of ids) {
    const { data, error } = await sbs.auth.admin.deleteUser(id);
    console.log(data);
    if (error) {
      console.log(error);
    }
  }
};

const listUser = async () => {
  const { data: itemData, error: itemError } = await sbs.from("items").select(
    `*,
        users!items_user_id_fkey1(
        upi_name,
        upi_id,
        phone_number,
        email,
        ifsc,
        account_number
        )`
  );
  console.log({ itemData, users: await itemData[0].users });
};

(async () => {
  const { data: payoutData, error: payoutError } = await sbs
    .from("seller_payouts")
    .insert({
      seller_name: "RIshikesh",
      seller_contact: {
        phone: "8759814731",
        email: "something@gmail.com",
      },
      payout_method: "upi",
      amount_due: "0.00",
      amount_paid_paise: "5000",
      buyer_transaction_ref: "oiodwioi",
      payout_status: "Paid",
      payout_datetime: new Date(Date.now()).toISOString(),
      upi_id: "8759814731@axl",
      payment_id: "acc_091930ie01",
      order_id: "order_ojf020d20c2",
      buyer_contact: {
        phone: "8759814731",
        email: "kishordebnath@gmail.com",
      },
      buyer_id: "eba47ee7-73f6-4a0c-b939-11b4bf9d046d",
    })
    .select();
  console.log({ payoutData, payoutError });
  if (payoutData && !payoutError) {
    const { data, error } = await sbs
      .from("items")
      .update({
        // id: paymentDetail.notes.id,
        bought_by: "eba47ee7-73f6-4a0c-b939-11b4bf9d046d",
      })
      .eq("id", "70312e30-bde4-4791-a9a0-314fcd60c84f");
    console.log(data);
    if (error) {
      console.log(error);
    }
  }
})();
