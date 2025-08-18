import sb from '../libs/createClient.js'
export default async function (refresh_token) {
    console.log("Here is the refresh token ->", refresh_token)
    const { data, error } = await sb.auth.getSession(refresh_token)
    console.log('Data from extendToken.js -->', data, error)
    return { data, error }
}