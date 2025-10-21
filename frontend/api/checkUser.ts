import path from './path.ts'
import isAccessTokenExpired from './checkAccessToken.ts'
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '../app/functions/getLocalInfo.ts';
export default async function ({ access_token, refresh_token }: { access_token?: string | null; refresh_token?: string | null }) {
    const local_access_token = await getAccessToken()
    const local_refresh_token = await getRefreshToken()
    if ((!local_access_token)) {
        return {
            access_token: null,
            refresh_token: null,
            message: 'New User',
            success: false
        }
    }
    const value = isAccessTokenExpired(access_token ?? local_access_token)
    if (value > 10) return {
        access_token,
        refresh_token
    }
    else {
        const res = await fetch(`${path}/extendToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refresh_token ?? local_refresh_token })
        })
        console.log('Getting new access_token!')
        const response = await res.json()
        console.log('response form  checkUser: ', response)
        if (response.session.access_token && response.session.refresh_token) {

            await setAccessToken(response.access_token)
            await setRefreshToken(response.refresh_token)
        }
        console.log(response)
        if (response.success) {
            return {
                access_token: response.session.access_token,
                refresh_token: response.session.refresh_token,
                ...response
            }
        } else {
            return { access_token, refresh_token, ...response }
        }
    }
}