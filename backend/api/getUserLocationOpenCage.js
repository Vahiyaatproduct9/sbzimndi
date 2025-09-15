export default async ({ lat, long }) => {
  return await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.OPENCAGE_API}`,
    {
      method: "GET",
    }
  ).then(async (res) => {
    const response = await res.json();
    console.log("response from OPenCage=>", response.results[0].components);
    return response.results[0].components;
  });
};
