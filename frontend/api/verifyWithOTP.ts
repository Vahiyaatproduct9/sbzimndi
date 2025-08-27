import backendUrl from './path.ts'
interface verify {
    email: string;
    token: string;
}
export default async function ({ token, email }: verify) {
    console.log('frontend - verifywithotp: ', email, token)
    const res = await fetch(`${backendUrl}/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, token
        })
    })
    console.log(res)
    const data = res.json()
    return data
}