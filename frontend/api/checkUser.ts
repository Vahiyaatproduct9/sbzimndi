import path from './path.ts'
import isAccessTokenExpired from './checkAccessToken.ts'
interface prop {
    access_token: string;
    refresh_token: string;
}
export default async function ({ access_token, refresh_token }: prop) {
    const value = isAccessTokenExpired(access_token)
    if (!value) return {
        access_token,
        refresh_token
    }
    else {
        const data = { refresh_token }
        const res = await fetch(`${path}/extendToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        console.log('Getting new access_token!')
        const response = await res.json()
        if (response.status === 200) return {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            message: 'Session Renewed!'
        }
        else return {
            access_token: null,
            refresh_token: null,
            message: 'Some Error Occured '
        }
    }
}