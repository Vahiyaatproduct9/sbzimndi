import AsyncStorage from "@react-native-async-storage/async-storage";
import path from "./path";
import { useProfileStore } from "../app/store/useProfileStore";
import { getAccessToken } from "../app/functions/getLocalInfo";
export default async () => {
  console.log('getting orders from getOrders')
  const local_access_token = useProfileStore(s => s.access_token) || await getAccessToken()
  const res = await fetch(`${path}/getOrders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: local_access_token })
  })
  const response = await res.json()
  console.log('Response from list_orders: ', response)
  if (response?.success)
    try { await AsyncStorage.setItem('orders', JSON.stringify(response?.data || [])) }
    catch (e) { console.log('Error occured: ', e) }
  if (!response) return { success: false, data: null, error: 'Server Error :(' }
  return response
}
