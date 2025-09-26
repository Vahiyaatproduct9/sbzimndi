import backendUrl from './path.ts'
export default async function (access_token: string) {
    const data = await fetch(`${backendUrl}/profile`,
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ access_token })
        }
    )
    const d = await data.json()
    console.log(d)
    return await d
}

