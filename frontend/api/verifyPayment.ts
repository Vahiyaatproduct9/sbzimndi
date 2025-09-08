import path from './path'
export default async (result: any[]) => {
    const res = await fetch(`${path}/verify-payment`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(result)
    })
    const response = await res.json()
    return response
}