import path from './path.ts'
import isAccessTokenExpired from './checkAccessToken.ts'
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '../app/functions/getLocalInfo.ts';
export default async function () {
    const access_token = await getAccessToken()
    const refresh_token = await getRefreshToken()
    if (!access_token || !refresh_token) {
        return {
            access_token: null,
            refresh_token: null,
            message: 'New User',
            success: false
        }
    }
    const value = isAccessTokenExpired(access_token)
    if (!value) return {
        access_token,
        refresh_token
    }
    else {
        const res = await fetch(`${path}/extendToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token })
        })
        console.log('Getting new access_token!')
        const response = await res.json()
        if (response.access_token && response.refresh_token) {
            await setAccessToken(response.access_token)
            await setRefreshToken(response.refresh_token)
        }
        console.log(response)
        if (response.status === 200) return {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            message: 'Session Renewed!',
            success: true
        }
        else return {
            access_token: null,
            refresh_token: null,
            message: 'Some Error Occured ',
            success: false
        }
    }
}