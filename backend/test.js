import sb from "./libs/createClient.js";
import sbs from "./libs/createAuth.js";
const data = async () => {
  const { data, error } = await sb.from("test").select("*");
  const d = data;
  console.log(d);
};
import fuse from "fuse.js";

const deleteUser = async () => {
  // const res = await sbs.auth.admin.listUsers()
  // const ids = res.data.users.map(user => user.id)
  // console.log()
  const id = "4a91fad1-2a34-4c1b-9915-27300386c9ba";
  const { data, error } = await sbs.auth.admin.deleteUser(id);
  console.log(data);
  if (error) {
    console.log(error);
  }
};

const url =
  "https://us1.locationiq.com/v1/reverse?lat=40.748442&lon=-73.985658&format=json&key=pk.37b6d23af9758767948e37989056c09f";
const options = { method: "GET", headers: { accept: "application/json" } };

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
// const hellofunc = async () => {
//   const { data, error } = await sb.functions.invoke("sayhello", {
//     body: { name: "Grishma" },
//   });
//   console.log(data, error);
// };

// const find_nearest_items = async () => {
//   const res = await sb.rpc("find_nearest_items", {
//     p_longitude: 0,
//     p_latitude: 0,
//     p_limit_count: 3,
//   });
//   console.log(res);
// };
// const search = async ({ latitude, longitude, query }) => {
//   const { data, error } = await sb.rpc("find_nearest_items", {
//     p_latitude: latitude,
//     p_longitude: longitude,
//     p_limit_count: 100,
//   });
//   if (data && !error) {
//     const searchPlatform = new fuse(data, {
//       includeScore: true,
//       keys: ["name", "price", "expiry_date"],
//     });
//     const result = searchPlatform.search(query);
//     console.log(result);
//   } else {
//     console.log(error);
//   }
// };
