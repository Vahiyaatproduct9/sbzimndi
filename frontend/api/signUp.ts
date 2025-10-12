import backendUrl from './path.ts'
import { signUpInfo } from '../types/types'
import messaging from '@react-native-firebase/messaging'
export async function signup({ name, email, password, phone,
    location, ifsc,
    accountNumber, pan_number, aadhar_uri,
    fullName,
    upiId,
    bank_proof_uri, pan_uri }: signUpInfo) {
    console.log({
        name,
        email,
        password,
        phone,
        location,
        ifsc, accountNumber,
        upiId,
        fullName,
        pan_number,
        aadhar_uri,
        bank_proof_uri,
        pan_uri
    })
    try {
        const fcm_token = await messaging().getToken()
        const form = new FormData()
        form.append('info', JSON.stringify({
            name,
            email,
            password,
            phone,
            upiId,
            fullName,
            fcm_token,
            location: {
                lat: Array.isArray(location) ? location[0] : location.lat,
                long: Array.isArray(location) ? location[1] : location.long,
                acc: Array.isArray(location) ? location[2] : location.acc
            },
            ifsc: ifsc || null,
            accountNumber: accountNumber || null,
            pan: pan_number || null,
            verified: ifsc && accountNumber && pan_number && aadhar_uri && bank_proof_uri && pan_uri ? true : false
        }))
        aadhar_uri && form.append('aadhar_front', {
            uri: aadhar_uri || '',
            type: `image/${aadhar_uri?.split('.').pop()?.split('?')[0] || 'jpg'}`,
            name: `aadhar_front.${aadhar_uri?.split('.').pop() || 'jpg'}`
        } as any)
        bank_proof_uri && form.append('bank_proof', {
            uri: bank_proof_uri || '',
            type: `image/${bank_proof_uri?.split('.').pop()?.split('?')[0] || 'jpg'}`,
            name: `bank_proof.${bank_proof_uri?.split('.').pop() || 'jpg'}`
        } as any)
        pan_uri && form.append('personal_pan', {
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
        return await response
    }
    catch (e) {
        console.log(e)
    }
}