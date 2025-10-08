import messaging from '@react-native-firebase/messaging'
import { setAccessToken, setRefreshToken } from '../app/functions/getLocalInfo.ts';
import path from './path.ts'
interface prop {
    email: string;
    password: string;
}
export default async function signin({ email, password }: prop) {
    console.log('SIgn in')
    try {
        const fcm_token = await messaging().getToken()
        const res = await fetch(`${path}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, fcm_token })
        });
        // FIX THE BUGGGGG HEREEE
        const data = await res.json();
        data?.access_token && await setAccessToken(data.access_token)
        data?.refresh_token && await setRefreshToken(data.refresh_token)
        console.log('signIn data : ', data)
        return data
    }
    catch (e) {
        console.log('Try catch error', e)
        return { error: e, success: false }
    }
}
