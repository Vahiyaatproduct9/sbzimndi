import sb from '../libs/createClient.js'

export default async ({ access_token }) => {
    console.log("Access token rfom getProfile.js --> ", { access_token })
    const { data, error } = await sb.auth.getUser(access_token)
    const { data: itemData, error: itemError } = await sb
        .from('items')
        .select('*')
        .eq('user_id', data.user.id)
    if (!error && !itemError) {
        return { ...data.user, items: itemData }
    }
}