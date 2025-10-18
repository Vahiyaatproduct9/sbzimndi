import { Conversation_Data, Profile, User } from "../../types/types";
interface enhancedUser extends User {
    last_message: string | null;
    last_message_at: string | null;
    conversation_id: string;
    my_id: string;
}
export default ({ data, profile }: { data: Conversation_Data[], profile: Profile }) => {
    console.log('origin data: ', data)
    const local_user_id = profile.data?.id
    let newData: enhancedUser[] | null = [];
    for (const item of data) {
        if (item.buyer_id === local_user_id) {
            newData.push({
                ...item.seller,
                last_message: null,
                last_message_at: null,
                conversation_id: "",
                my_id: ""
            })
        } else if (item.seller_id === local_user_id) {
            newData.push({
                ...item.buyer,
                last_message: null,
                last_message_at: null,
                conversation_id: "",
                my_id: ""
            })
        }
        newData[newData.length - 1] = {
            ...newData[newData.length - 1],
            conversation_id: item.id,
            last_message: item.last_message,
            last_message_at: item.last_message_at,
            my_id: local_user_id ?? ''
        }
    }
    console.log('newData :', newData)
    return newData
}