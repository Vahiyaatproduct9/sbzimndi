import backendUrl from './path.ts'
interface signupInfo {
    name: string;
    email: string;
    password: string;
    repass: string;
    phone: string;
    location: {
        lat: number;
        long: number;
        acc: number;
    }

}
export async function signup({ name, email, password, repass, phone, location: { lat, long, acc } }: signupInfo) {
    async function checksignup() {
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
                }
            })

        })
        if (data.status === 200 || data.status === 201) return true
        return false
    }
    if (password === repass) {
        if (password.length >= 8) {
            if (email.includes('@')) {
                if (name.length >= 3) {
                    if (checkNumber(phone) && phone.length === 10) {
                        const data = async () => {
                            const res = await checksignup()
                            if (res === true) {
                                return 'Registered! :D'
                            }
                            return 'Failed :('
                        }
                        return data()
                    }
                    else {
                        return 'Invalid Phone :('
                    }
                }
                else {
                    return 'Invalid Name :('
                }
            }
            else {
                return 'Invalid Email :('
            }
        }
        else {
            return "Password too small..."
        }
    }
    else {
        return 'Password Mismatch :('
    }
}
function checkNumber(phone: string) {
    const numList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    for (const num of phone) {
        if (numList.includes(num)) {
            return true
        }
        return false
    }
}
