import backendUrl from './path.ts'
export default async (formData: FormData) => {
    const res = await fetch(`${backendUrl}/addpost`, {
        method: 'POST',
        body: formData
    })
    const r = await res.json()
    console.log('log from addItem.ts ==> ', r)
    if (r.status === 200) return true
    else return false
}