import { getAccessToken } from "../app/functions/getLocalInfo";
import path from "./path";
type props = {
    access_token?: string;
    reciever_id: string;
    iambuyer: boolean;
    user_id?: string;
}
export default async ({ access_token, reciever_id, iambuyer, user_id }: props) => {
    const local_access_token = await getAccessToken()
    const res = await fetch(`${path}/conversation/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            access_token: access_token ? access_token : local_access_token,
            reciever_id,
            iambuyer,
            user_id: user_id ? user_id : null
        })
    })
    const response = await res.json()
    console.log('response from getAConversation: ', response)
    return response
}