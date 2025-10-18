import AsyncStorage from "@react-native-async-storage/async-storage";
import message, { requestPermission } from "@react-native-firebase/messaging";
export default async () => {
  const messaging = message()
  const authStatus = await requestPermission(messaging);
  if (
    authStatus === message.AuthorizationStatus.AUTHORIZED ||
    authStatus === message.AuthorizationStatus.PROVISIONAL
  ) {
    console.log('permission grantend:', authStatus);
    const token = await message().getToken()
    await AsyncStorage.setItem('fcmToken', token)
    return token
  } else {
    console.log('denied')
    return null
  };
}