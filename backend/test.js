import sb from './libs/createClient.js'
import sbs from './libs/createAuth.js'
const data = async () => {
    const { data, error } = await sb.from('test').select('*')
    const d = data
    console.log(d)
}

const deleteUser = async () => {
    // const res = await sbs.auth.admin.listUsers()
    // const ids = res.data.users.map(user => user.id)
    // console.log()
    const id = 'f628ef98-cc89-4b72-9047-f38bde7a8632'
    const { data, error } = await sbs.auth.admin.deleteUser(id)
    console.log(data)
    if (error) {
        console.log(error)
    }

}
const hellofunc = async () => {
    const { data, error } = await sb.functions.invoke('sayhello', {
        body: { name: "Grishma" }
    })
    console.log(data, error)
}

const find_nearest_items = async () => {
    const res = await sb.rpc('find_nearest_items', {
        p_longitude: 0,
        p_latitude: 0,
        p_limit_count: 3,
    })
    console.log(res)
}
find_nearest_items()
