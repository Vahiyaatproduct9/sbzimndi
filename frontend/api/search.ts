import path from "./path";
interface prop {
    latitude: number,
    longitude: number,
    query: string
}
export default async ({ latitude, longitude, query }: prop) => {
    const res = await fetch(`${path}/search`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            latitude,
            longitude,
            query
        })
    })
    console.log(res)
    return res
}