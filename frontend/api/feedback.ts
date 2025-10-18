import path from "./path";
export default async ({ access_token, body, stars }:
  { access_token: string | null; body: string; stars: number }) => {
  console.log('access_token from feedback: ', access_token)
  const res = await fetch(`${path}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ access_token, body, stars })
  })
  const response = await res.json()
  return response
}
