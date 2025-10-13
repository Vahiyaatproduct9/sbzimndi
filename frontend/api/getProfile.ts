import { getAccessToken } from '../app/functions/getLocalInfo.ts'
import messaging from '@react-native-firebase/messaging'
import backendUrl from './path.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default async function (props: {
  access_token?: string | null,
  user_id?: string | null
}) {
  const local_access_token = await getAccessToken() || null;
  const fcm_token = await messaging().getToken()
  const data = await fetch(`${backendUrl}/profile`,
    {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        access_token: props.user_id ? null : props.access_token ? props.access_token : local_access_token,
        fcm_token: props.user_id ? null : fcm_token,
        user_id: props.user_id ? props.user_id : null
      })
    }
  )
  const d = await data.json()
  if (!props.user_id) {
    try {
      await AsyncStorage.setItem('profile', JSON.stringify(d || []))
    }
    catch (e) {
      console.log('Error from getProfile:', e)
    }
  }
  console.log('new profile from getProfile.ts:', d)
  return d
}

