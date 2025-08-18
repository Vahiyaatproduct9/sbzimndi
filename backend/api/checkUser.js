import sb from '../libs/createClient.js'
export default async function (access_token) {
    const { data, error } = await sb.auth.getUser(access_token)
    return { data, error }
}