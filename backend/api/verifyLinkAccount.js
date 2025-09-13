import rzp from "../libs/rzpClient.js";
export default async ({ linkedAccountId, ifsc, account_number, name }) => {
  const requestProductConfiguration =
    await rzp.products.requestProductConfiguration(linkedAccountId, {
      product_name: "route",
      tnc_accepted: true,
    });
  if (requestProductConfiguration.error) {
    console.log({ requestProductConfiguration });
    return {
      success: false,
      message: requestProductConfiguration.error.description,
    };
  }
  const form = new FormData();

  const uploadDocs = await rzp.accounts.uploadAccountDoc(linkedAccountId, {});
};
