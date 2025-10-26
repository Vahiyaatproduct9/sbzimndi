import backendUrl from './path.ts'
export default async (formData: FormData) => {
    const res = await fetch(`${backendUrl}/addpost`, {
        method: 'POST',
        body: formData
    })
    const response = await res.json()
    console.log('log from addItem.ts ==> ', response)
    return response
}