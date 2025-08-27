import sb from '../libs/createClient.js'

export async function read_items({ latitude, longitude }) {
    const { data, error } = await sb.rpc('find_nearest_items', {
        p_latitude: latitude,
        p_longitude: longitude,
        p_limit_count: 15
    })
    return { data, error }
}