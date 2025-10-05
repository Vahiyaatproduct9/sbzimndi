import path from "./path"

export default async ({
    token
}: {
    token: string
}) => {

    const response = await fetch(`${path}/get-notification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    })
    const res = await response.json()
    console.log(res)
    return res
}