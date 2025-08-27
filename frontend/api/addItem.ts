import backendUrl from './path.ts'
export default async (formData: FormData) => {
    const res = await fetch(`${backendUrl}/addpost`, {
        method: 'POST',
        body: formData
    })
    console.log('formData -->', formData)
    console.log('fetching to', backendUrl)
    if (res.status === 200) return true
    else {
        console.log('log from addItem.ts', res)
        return false
    }
}