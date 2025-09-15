export default async ({ lat, long }) => {
  return await fetch(
    `https://us1.locationiq.com/v1/reverse?lat=${lat}&lon=${long}&format=json&key=${process.env.LOCATION_IQ_ACCESS_TOKEN}`,
    {
      method: "GET",
      headers: { accept: "application/json" },
    }
  ).then(async (res) => {
    const response = await res.json();
    console.log("location => ", response);
    return response;
  });
};
