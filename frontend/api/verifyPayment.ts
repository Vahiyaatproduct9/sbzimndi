import path from './path'
export default async ({result, access_token}: {result: any[], access_token: string} ) => {
    console.log({result, access_token})
    const res = await fetch(`${path}/verify-payment`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            result, access_token
        })
    })
    const response = await res.json()
    return response
}