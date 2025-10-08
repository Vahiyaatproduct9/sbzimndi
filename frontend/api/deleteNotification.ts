import { getAccessToken } from "../app/functions/getLocalInfo";
import path from "./path";
export default async ({ access_token, notification_id }: {
    access_token?: string;
    notification_id: string
}) => {
    const res = await fetch(`${path}/delete-notification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            notification_id,
            access_token: access_token ? access_token : await getAccessToken()
        })
    })
    const response = await res.json()
    return response
}