export default async ({ lat, long }) => {
  const res = await fetch(
    `https://us1.locationiq.com/v1/reverse?lat=${lat}2&lon=${long}&format=json&key=${process.env.LOCATION_IQ_ACCESS_TOKEN}`,
    {
      method: "GET",
      headers: { accept: "application/json" },
    }
  ).then(async (res) => await res.json());
  return await res;
};
