import { SearchResult } from "../types/types";
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
  const data: Promise<{
    result: SearchResult[] | null;
    success: boolean;
    message: string | null;
    error: any;
  } | null> = await res.json()
  console.log('rsuit: ', data)
  return data
}
