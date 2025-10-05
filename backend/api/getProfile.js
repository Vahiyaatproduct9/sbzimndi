import sb from "../libs/createClient.js";

export default async ({ access_token }) => {
  const { data, error } = await sb.auth.getUser(access_token);
  const { data: userData, error: userError } = await sb
    .from("users")
    .select(`*,items!items_user_id_fkey1(*)`)
    .eq("id", data.user.id) // users.id
    .single();
  if (error) {
    console.log("user Error :( --> ", error);
  }
  if (!error && !userError) {
    return { success: true, ...data.user, items: userData, status: 200 };
  } else {
    return { success: false, error, status: error.status };
  }
};
