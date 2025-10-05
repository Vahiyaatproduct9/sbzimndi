import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging'
import update_fcm from "../../api/update_fcm";
import { getAccessToken } from "./getLocalInfo";
// import path from "../../api/path";
export default async (profile_fcm_token?: string | null) => {
    console.log('Running update fcm')
    const access_token = await getAccessToken()
    const fcm_token = await messaging().getToken()
    const local_fcm_token = await AsyncStorage.getItem('fcm_token')
    if (!local_fcm_token || fcm_token !== local_fcm_token) {
        await AsyncStorage.setItem('fcm_token', await messaging().getToken())
    }
    if (access_token.length > 0 && profile_fcm_token && profile_fcm_token !== fcm_token) {
        return await update_fcm({ access_token, fcm_token })
    }
    if (access_token.length > 0 && !profile_fcm_token) {
        return await update_fcm({ access_token, fcm_token })
    }
    messaging().onTokenRefresh(async token => {
        console.log('New Token:', token)
        return await update_fcm({ access_token, fcm_token: token })
    })
}