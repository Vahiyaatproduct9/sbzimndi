import sb from '../libs/createClient.js'
export default async function (refresh_token) {
  const { data, error } = await sb.auth.refreshSession({ refresh_token })
  if (error) console.log('error from extendToken.js: ', error)
  return { data, error }
}
