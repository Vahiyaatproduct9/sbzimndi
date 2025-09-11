import backendUrl from './path.ts'
interface signupInfo {
    name: string;
    email: string;
    password: string;
    phone: string;
    location: {
        lat: number;
        long: number;
        acc: number;
    },
    ifsc?: string | null;
    accountNumber?: string | null;

}
export async function signup({ name, email, password, phone, location: { lat, long, acc }, ifsc, accountNumber }: signupInfo) {
    
        const data = await fetch(`${backendUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phone,
                location: {
                    lat,
                    long,
                    acc
                },
                ifsc,
                accountNumber
            })
        })
        const response = await data.json()
        if (response.success === true) return true
        return false
    }