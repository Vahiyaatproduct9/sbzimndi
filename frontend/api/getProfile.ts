import { getAccessToken } from '../app/functions/getLocalInfo.ts'
import messaging from '@react-native-firebase/messaging'
import backendUrl from './path.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default async function (access_token?: string | null) {
    const local_access_token = await getAccessToken()
    const fcm_token = await messaging().getToken()
    const data = await fetch(`${backendUrl}/profile`,
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ access_token: access_token ? access_token : local_access_token, fcm_token })
        }
    )
    const d = await data.json()
    await AsyncStorage.setItem('profile', JSON.stringify(d))
    console.log('New Profile:', d)
    return await d
}

