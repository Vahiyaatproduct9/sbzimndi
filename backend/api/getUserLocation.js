import getUserLocationLocationIQ from "./getUserLocationLocationIQ.js";
import getUserLocationOpenCage from "./getUserLocationOpenCage.js";
import getPINCode from "./getPINCode.js";

export default async ({ lat, long }) => {
  console.log({ lat, long });

  // Default address structure
  let address = {
    street1: "",
    street2: "",
    city: "",
    state: "Unknown State",
    postal_code: "",
    country: "IN",
  };

  // Get from LocationIQ
  let display_name;
  const result1 = await getUserLocationLocationIQ({ lat, long });
  const address1 = result1?.address ?? {};
  display_name = result1?.address ?? "";

  // If some values missing, try OpenCage
  let address2 = {};
  if (Object.values(address1).some((v) => v === undefined || v === null)) {
    address2 = (await getUserLocationOpenCage({ lat, long })) ?? {};
  }

  // Extract safely from OpenCage
  const {
    county: county2,
    road: road2,
    state: state2,
    postcode: postcode2,
    country_code: country_code2,
  } = address2;

  // PIN code fallback if both sources fail
  let postcode3 = "";
  if (!address1.postcode && !postcode2) {
    postcode3 = await getPINCode({
      PostOffice: address1.neighbourhood || address1.county || county2 || "",
      State: address1.state || state2 || "",
    });
  }

  // Construct normalized address
  address.street1 = address1.neighbourhood || address1.county || county2 || "";

  address.street2 =
    address1.road ||
    road2 ||
    address1.neighbourhood ||
    address1.county ||
    county2 ||
    "";

  address.city =
    address1.city ||
    address1.town ||
    address1.village ||
    address1.county ||
    county2 ||
    "";

  address.state = address1.state || state2 || "Unknown State";

  address.postal_code = String(
    address1.postcode || postcode2 || postcode3 || ""
  );

  address.country = (address1.country_code || country_code2 || "IN")
    .toString()
    .toUpperCase();

  return { address, display_name };
};
