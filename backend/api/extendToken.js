import sb from '../libs/createClient.js'
export default async function (refresh_token) {
    const { data, error } = await sb.auth.refreshSession({ refresh_token })
    console.log('Data from extendToken.js -->', data, error)
    return { data, error }
}