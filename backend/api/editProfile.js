import sb from '../libs/createClient.js'
import sbs from '../libs/createAuth.js'

export default async ({ info, access_token }) => {
    const { data: userData, error: userError } = await sb.auth.getUser(access_token)
    const { data, error } = await sbs.auth.admin.updateUserById(userData.user.id,
        {
            
        })
}