import AsyncStorage from "@react-native-async-storage/async-storage";
import path from "./path";
import { useProfileStore } from "../app/store/useProfileStore";
export default async (access_token?: string) => {
  console.log('getting orders from getOrders')
  const local_access_token = useProfileStore(s => s.access_token)
  const res = await fetch(`${path}/get-orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: access_token ? access_token : local_access_token })
  })
  const response = await res.json()
  console.log('Response from list_orders: ', response)
  if (response?.success) await AsyncStorage.setItem('orders', JSON.stringify(response?.data ?? []))
  if (!response) return { success: false, data: null, error: 'Server Error :(' }
  return response
}
