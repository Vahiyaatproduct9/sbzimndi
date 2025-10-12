import AsyncStorage from "@react-native-async-storage/async-storage";
import { Conversation_Data, User } from "../../types/types";
export default async (data: Conversation_Data[]) => {
    const local_user_id = await AsyncStorage.getItem('profile')
        .then(res => {
            const profile: User = JSON.parse(res || '')
            return profile.id
        })
    let newData = [];
    for (const item of data) {
        if (item.buyer_id === local_user_id) {
            newData.push({ ...item.seller, conversation_id: item.id, last_message: item.last_message, last_message_at: item.last_message_at, my_id: local_user_id })
        } else if (item.seller_id === local_user_id) {
            newData.push({ ...item.buyer, conversation_id: item.id, last_message: item.last_message, last_message_at: item.last_message_at, my_id: local_user_id })
        } else continue
    }
    console.log('newData :', newData)
    return newData
}