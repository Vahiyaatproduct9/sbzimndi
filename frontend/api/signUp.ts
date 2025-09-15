import backendUrl from './path.ts'
interface signupInfo {
    name: string;
    email: string;
    password: string;
    phone: string;
    location: number[] | {lat: number, long: number, acc: number},
    ifsc?: string | null;
    accountNumber?: string | null;
    pan_number?: string | null;
    aadhar_uri?: string | null;
    bank_proof_uri?: string | null;
    pan_uri?: string | null;
}
export async function signup({ name, email, password, phone,
    location, ifsc,
    accountNumber,pan_number, aadhar_uri,
    bank_proof_uri, pan_uri }: signupInfo) {
    console.log({
        name,
        email,
        password,
        phone,
        location,
        ifsc, accountNumber,
        pan_number,
        aadhar_uri,
        bank_proof_uri,
        pan_uri
    })
try{
        const form = new FormData()
        form.append('info', JSON.stringify({
            name,
            email,
            password,
            phone,
            location: {
                lat: Array.isArray(location) ? location[0] : location.lat,
                long:Array.isArray(location) ? location[1] : location.long,
                acc: Array.isArray(location) ? location[2] : location.acc
            },
            ifsc: ifsc || null,
            accountNumber: accountNumber || null,
            pan: pan_number || null,
            verified: ifsc && accountNumber && pan_number && aadhar_uri && bank_proof_uri && pan_uri ? true : false
        }))
        form.append('aadhar_front', {
            uri: aadhar_uri || '',
            type: `image/${aadhar_uri?.split('.').pop()?.split('?')[0] || 'jpg'}`,
            name: `aadhar_front.${aadhar_uri?.split('.').pop() || 'jpg'}`
        } as any)
        form.append('bank_proof', {
            uri: bank_proof_uri || '',
            type: `image/${bank_proof_uri?.split('.').pop()?.split('?')[0] || 'jpg'}`,
            name: `bank_proof.${bank_proof_uri?.split('.').pop() || 'jpg'}`
        } as any)
        form.append('personal_pan', {
            uri: pan_uri || '',
            type: `image/${pan_uri?.split('.').pop()?.split('?')[0] || 'jpg'}`,
            name: `personal_pan.${pan_uri?.split('.').pop() || 'jpg'}`
        } as any)
        console.log(form)
    
        const data = await fetch(`${backendUrl}/signup`, {
            method: 'POST',
            body: form
        })
        const response = await data.json()
        if (response.success === true) return true
        return false
        }
        catch(e){
            console.log(e)
        }
    }