import sb from "../libs/createClient.js";
export default async (id) => {
  console.log("Fetching item with ID:", id);
  const { data, error } = await sb
    .from("items")
    .select(`*, users!items_user_id_fkey1(full_name, phone_number)`)
    .eq("id", id)
    .single();
  if (error) {
    console.log("Error fetching item:", error);
    return { ...error, status: 500 };
  } else {
    return { ...data, status: 200 };
  }
};
