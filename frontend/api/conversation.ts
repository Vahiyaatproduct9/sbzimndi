import { getAccessToken } from "../app/functions/getLocalInfo";
import { Conversation, Message } from "../types/types";
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
        send: async function (params?: { access_token?: string, user_id?: string, conversation_id: string, message: string }) {
            const local_access_token = await getAccessToken()

            const res = await fetch(`${path}/conversation/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_token: params?.access_token ? params.access_token : local_access_token,
                    user_id: params?.user_id ? params.user_id : null,
                    conversation_id: params?.conversation_id,
                    message: params?.message,
                })
            })
            const response: {
                success: boolean;
                error: string | null;
                data: Message | null;
                message: string | null
            } = await res.json()
            console.log('response from conversation send: ', response)
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
            const response: Conversation = await res.json()
            console.log('response from conversation list: ', response)
            return response
        },
        get: async function (params: {
            access_token?: string;
            user_id?: string;
            conversation_id: string;
            last_message_at?: Date | string | null
        }) {
            console.log('getting chat logs from conversation.ts')
            const local_access_token = await getAccessToken()

            const res = await fetch(`${path}/conversation/get`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_token: params.access_token ? params.access_token : local_access_token,
                    conversation_id: params.conversation_id,
                    user_id: params.user_id,
                    last_message_at: params.last_message_at
                })
            })
            const response: {
                success: boolean;
                data: Message[] | null;
                error?: string;
                message?: string;
            } = await res.json()
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
