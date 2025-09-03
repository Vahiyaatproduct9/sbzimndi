import { getAndSetLocation } from "../../api/getLocation"
import addItem from "../../api/addItem"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default async ({
    setPosted,
    photo,
    name,
    date,
    quantity,
    location,
    price,
    desc,
    setLocation,
    setMess,
    setActiveTab
}: {
    setPosted: React.Dispatch<React.SetStateAction<boolean | "" | null>>;
    photo: any;
    name: string;
    date: Date;
    quantity: string;
    location: number[] | null;
    price: string;
    desc: string;
    setLocation: React.Dispatch<React.SetStateAction<number[] | null>>;
    setMess: React.Dispatch<React.SetStateAction<string>>;
    setActiveTab: React.Dispatch<React.SetStateAction<'home' | 'search' | 'add' | 'profile'>>;
}) => {
    if (photo &&
        name.length > 0 &&
        price.length > 0 &&
        desc.length > 0
    ) {
        setPosted(null)
        const access_token = await AsyncStorage.getItem('access_token')
        if (access_token) {
            return await getAndSetLocation(setLocation, setMess)
                .then(async () => {
                    let data = new FormData()
                    data.append("photo", {
                        uri: photo,
                        name: 'image.png',
                        type: "image/png"
                    } as any)
                    data.append("info", JSON.stringify({
                        name,
                        price,
                        expiryDate: date,
                        quantity,
                        desc,
                        location,
                        access_token
                    }))
                    // send the actual post function
                    const res = await addItem(data)
                    setPosted(res)
                    // function ends here
                })
        }
        else {
            setMess('Please Login Before Posting.')
            setTimeout(() => {
                setActiveTab('profile')
            }, 1500)
        }
    }
    else {
        setMess('Everything has to be filled!')
        setPosted(false)
    }
}