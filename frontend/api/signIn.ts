import messaging from '@react-native-firebase/messaging'
import { setAccessToken, setRefreshToken } from '../app/functions/getLocalInfo.ts';
import path from './path.ts'
interface prop {
    email: string;
    password: string;
}
export default async function signin({ email, password }: prop) {
    const fcm_token = await messaging().getToken()
    const res = await fetch(`${path}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fcm_token })
    });
    const data = await res.json();
    data && await setAccessToken(data.access_token)
    data && await setRefreshToken(data.refresh_token)
    console.log('signIn data : ', data)
    return data
}
