import sb from '../libs/createClient.js'
import sbs from '../libs/createAuth.js'
import { configDotenv } from 'dotenv'
configDotenv()
export default async function addPost({ photo, info }) {
    try {
        const access_token = await info.access_token
        const { data, error } = await sb.auth.getUser(access_token)
        const fileName = `${data.user.id}/${Date.now()}${photo.originalName || '.png'}`
        const { error: imgError } = await sbs
            .storage
            .from('uploads')
            .upload(fileName, photo.buffer, {
                contentType: photo.mimetype
            })
        const { data: itemData, error: itemError } = await sb
            .from('items')
            .insert({
                name: info.name,
                description: info.desc,
                quantity: info.quantity,
                price: info.price,
                expiry_date: info.expiryDate,
                latitude: info.location[0],
                longitude: info.location[1],
                accuracy: info.location[2],
                image_url: `${process.env.supabaseUrl}/storage/v1/object/public/uploads/${fileName}`,
                user_id: data.user.id,
                location: `POINT(${info.location[0]} ${info.location[1]})`
            }).select()
        console.log(itemData, itemError)
        return { error, itemError, imgError }
    }
    catch (e) {
        console.log('❌ -->', e)
        return { e }
    }
}