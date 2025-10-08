import { getAccessToken } from "../app/functions/getLocalInfo";
import path from "./path";
type props = {
    access_token?: string;
    reciever_id: string;
    iambuyer: boolean;
    user_id?: string;
}
function C() {
    return {
        start: async function ({ access_token, reciever_id, iambuyer, user_id }: props) {
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
        },
        list: async function (params?: { access_token?: string, user_id?: string }) {
            const local_access_token = await getAccessToken()

            const res = await fetch(`${path}/conversation/list`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_token: params?.access_token ? params.access_token : local_access_token,
                    user_id: params?.user_id ? params.user_id : null
                })
            })
            const response = await res.json()
            return response
        },
        delete: async function (params: { access_token?: string, user_id?: string, conversation_id: string }) {
            const local_access_token = await getAccessToken()

            const res = await fetch(`${path}/conversation/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_token: params.access_token ? params.access_token : local_access_token,
                    conversation_id: params.conversation_id,
                    user_id: params.user_id
                })
            })
            const response = await res.json()
            return response
        }
    }
}
export default C()