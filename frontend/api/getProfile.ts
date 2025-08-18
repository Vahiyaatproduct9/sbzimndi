import backendUrl from './path.ts'
export default async function () {
    const data = await fetch(`${backendUrl}/profile`)
    const d = await data.text()
    return d
}

