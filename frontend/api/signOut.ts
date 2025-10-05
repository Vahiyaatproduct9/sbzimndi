import path from "./path"
import { getAccessToken } from "../app/functions/getLocalInfo"

export default async () => {
    const access_token = await getAccessToken()
    const response = await fetch(`${path}/signOut`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_token
        })
    })
    return await response.json()
}