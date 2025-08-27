import sb from '../libs/createClient.js'
import fuse from 'fuse.js'
export default async ({ latitude, longitude, query }) => {
    const { data, error } = await sb.rpc('find_nearest_items', {
        p_latitude: latitude,
        p_longitude: longitude,
        p_limit_count: 100
    })
    if (data && !error) {
        const searchPlatform = new fuse(data, {
            includeScore: true,
            keys: [{
                name: 'name',
                weight: 4
            }, 'price', {
                name: 'expiry_date',
                weight: 2
            }]
        })
        const result = searchPlatform.search(query)
        console.log(result)
        return { ...result, status: 200 }
    } else {
        return { ...error, status: error.status || error.code }
    }
}