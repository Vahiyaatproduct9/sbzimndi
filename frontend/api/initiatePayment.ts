import path from './path'
export default async (id: string) => {
    const res = await fetch(`${path}/initiate-payment`, {
        method: 'POST',
        headers: {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })
    const response = await res.json()
    return response
}