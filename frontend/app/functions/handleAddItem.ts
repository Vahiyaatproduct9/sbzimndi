// utils/handleSubmit.ts
import { getAndSetLocation } from "../../api/getLocation";
import addItem from "../../api/addItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
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
    setActiveTab: React.Dispatch<
        React.SetStateAction<"home" | "search" | "add" | "profile">
    >;
};

export default async function handleSubmit({
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
    setActiveTab,
}: Props) {
    if (!photo || !name || !price || !desc) {
        setMess("Everything has to be filled!");
        setPosted(false);
        return;
    }

    const access_token = await AsyncStorage.getItem("access_token");
    if (!access_token) {
        setMess("Please Login Before Posting.");
        setTimeout(() => setActiveTab("profile"), 1500);
        return;
    }

    if (!location) {
        await getAndSetLocation(setLocation, setMess);
        return; // wait for location update first
    }

    let data = new FormData();
    data.append("photo", {
        uri: photo,
        name: "image.png",
        type: "image/png",
    } as any);

    data.append(
        "info",
        JSON.stringify({
            name,
            price,
            expiryDate: date,
            quantity,
            desc,
            location, // [long, lat, accuracy]
            access_token,
        })
    );

    setPosted(null); // disable button during submission
    const res = await addItem(data);
    setPosted(res);
}
