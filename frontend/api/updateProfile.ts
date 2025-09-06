import path from "./path";
export default async ({
    photo,
    name,
    access_token,
    spirit_animal,
    user_type,
    bio
}: {
    photo?: any;
    name?: string | null;
    access_token?: string | null;
    spirit_animal?: string | null;
    user_type?: string | null;
    bio?: string | null;
}) => {
    try {
        console.log('updating profile')
        const form = new FormData();
        photo && form.append('photo', {
            uri: photo,
            name: 'profile.jpg',
            type: 'image/jpeg'
        });
        form.append('info', JSON.stringify({
            name,
            access_token,
            spirit_animal,
            user_type,
            bio
        }));
        const res = await fetch(`${path}/updateprofile`, {
            method: 'POST',
            body: form
        })
        return await res.json().then(data => data.updated);
    }
    catch (err) {
        console.log(err)
        return false
    }
}