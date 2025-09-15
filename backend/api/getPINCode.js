export default async ({ PostOffice, State }) => {
  try {
    const res = await fetch(
      `https://api.postalpincode.in/postoffice/${PostOffice}`
    ).then(async (res) => await res.json());
    if (res[0].Status !== "Success") return null;
    for (const postoffice of res[0].PostOffice) {
      if (postoffice.Name === PostOffice && postoffice.State === State) {
        console.log(postoffice.Pincode);
        return parseInt(postoffice.Pincode);
      }
    }
  } catch (e) {
    console.log("EError from getPINCode ->", e);
    return null;
  }
};
