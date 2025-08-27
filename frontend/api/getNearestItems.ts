import path from "./path"
interface location {
    latitude: number,
    longitude: number,
    accuracy: number
}
export default async ({ latitude, longitude, accuracy }: location) => {
    const res = await fetch(`${path}/getItems`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude,
            longitude,
            accuracy
        })
    })
    const data = await res.json()
    console.log('data from getNearestItems --> ', data)
    return data
}