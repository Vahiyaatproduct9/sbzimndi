import path from './path'
export default async (item_id: string) => {
    const res = await fetch(`${path}/orderOtp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item_id })
    })
    const response = await res.json()
    return response
}