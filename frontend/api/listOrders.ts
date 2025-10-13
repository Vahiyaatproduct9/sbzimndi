import { getAccessToken } from "../app/functions/getLocalInfo";
import path from "./path";
export default async (access_token?: string) => {
    console.log('getting orders from getOrders')
    const local_access_token = await getAccessToken()
    const res = await fetch(`${path}/get-orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: access_token ? access_token : local_access_token })
    })
    const response = await res.json()
    console.log('Response from list_orders: ', response)
    if (!response) return { success: false, data: null, error: 'Server Error :(' }
    return response
}