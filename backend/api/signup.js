import supabase from '../libs/createClient.js'
import sbs from '../libs/createAuth.js'
export default async ({ name, email, password, phone, location: { lat, long, acc } }) => {
    const { data: createUserData, error: createUserError } = await sbs.auth.admin.createUser({
        email,
        password,
        email_confirm: false
    })
    if (createUserError) console.log(createUserError)
    if (createUserData.user) {
        const { error: authError } = await supabase.auth.signInWithOtp({
            email
        })
        if (!authError || !passErr) {
            const { data, error } = await supabase.from('users').insert({
                id: createUserData.user.id,
                full_name: name,
                email,
                phone_number: phone,
                password,
                latitude: lat,
                longitude: long,
                accuracy: acc
            }).select()
            if (data && !error) {
                console.log(data)
                return true
            }
            console.log(error)
            return false
        }
        else {
            console.log('error ---> ', authError, passErr)
            return false
        }
    }
}