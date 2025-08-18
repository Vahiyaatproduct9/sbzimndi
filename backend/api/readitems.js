import sb from '../libs/createClient.js'

export async function read_items() {
    const { data, error } = await sb.from('items').select('*')
    return error ? error : data
}