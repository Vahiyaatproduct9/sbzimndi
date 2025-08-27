import path from './path.ts'
interface prop {
    email: string;
    password: string
}
export default async function signin({ email, password }: prop) {
    const res = await fetch(`${path}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    console.log(data)
    return {
        status: res.status,
        ...data
    };
}
