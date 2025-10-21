import path from './path'
export default async ({ item_id, code }: { item_id: string; code: string; }) => {
    const res = await fetch(`${path}/checkOtp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item_id, code })
    })
    const response: {
        success: boolean;
        message: string;
        error?: any
    } = await res.json()
    return response
}