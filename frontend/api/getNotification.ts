import { getAccessToken } from "../app/functions/getLocalInfo"
import path from "./path"

export default async () => {
    const access_token = await getAccessToken()
    const response = await fetch(`${path}/get-notification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token
        })
    })
    const res = await response.json()
    console.log(res)
    return res
}