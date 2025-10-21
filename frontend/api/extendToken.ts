import path from './path'
export default async ({ access_token, refresh_token }:
    { access_token: string | null; refresh_token: string | null; }) => {
    const res = await fetch(`${path}/extendToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ access_token, refresh_token })
    })
    const response = await res.json()
    return response
}