import sb from '../libs/createClient.js'

export default async ({ access_token }) => {
    const { data, error } = await sb.auth.getUser(access_token)
    const { data: userData, error: userError } = await sb
        .from("users")
        .select(`
      *,
      items(*)
    `)
        .eq("id", data.user.id)  // users.id
        .single();
    if (!error && !userError) {
        return { ...data.user, items: userData, status: 200 }
    }
    else return { error, status: error.status }
}