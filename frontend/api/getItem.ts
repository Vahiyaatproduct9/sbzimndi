import path from "./path";
export default async (id: string) => {
    const res = await fetch(`${path}/getpost?id=${id}`);
    const r = await res.json();
    console.log('log from getItem.ts ==> ', r);
    if (r.status === 200) return r;
    else return null
}
