import sb from '../libs/createClient.js'
export default async function ({ email, password }) {
    const { data, error } = await sb.auth.signInWithPassword({
        email,
        password
    })
    console.log('signin error -->', error)
    return { data, error }
}