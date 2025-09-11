import rzp from "../libs/rzpClient.js";
export default async ({ linkedAccountId, ifsc, account_number, name }) => {
  const requestProductConfiguration =
    await rzp.products.requestProductConfiguration(linkedAccountId, {
      product_name: "route",
      tnc_accepted: true,
    });
};
