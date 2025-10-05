import path from "./path";

export default async ({ access_token, fcm_token }: {
    access_token: string;
    fcm_token: string;
}) => {
    const response = await fetch(`${path}/update-fcm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token,
            fcm_token
        })
    })
    const result = await response.json()
    console.log('result from update fcm', result)
    return result
}