import AsyncStorage from "@react-native-async-storage/async-storage";
import conversation from "../../api/conversation";
import { User } from "../../types/types";
interface enhancedUser extends User {
    last_message: string | null;
    last_message_at: string | null;
    conversation_id: string;
    my_id: string;
}
import mapChats from "./mapChats";
import React from "react";

export default async ({ setList, setMessage }: {
    setList: React.Dispatch<React.SetStateAction<enhancedUser[] | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>
}) => {
    let contacts: { data: enhancedUser[], time: number } | null;
    try {
        const local_contacts = await AsyncStorage.getItem('contacts').then(res =>
            JSON.parse(res || ''),
        );
        contacts = local_contacts;
    }
    catch (err) {
        contacts = null;
        console.error('Error from getContacts:', err)
    }
    console.log('contacts: ', contacts)
    if (contacts && contacts?.time - Date.now() > 600000) {
        setList(contacts.data);
    } else {
        const {
            success,
            data,
            error,
            message: fetchMessage,
        } = await conversation.list();
        if (success) {
            const filteredData: enhancedUser[] = await mapChats(data);
            await AsyncStorage.setItem(
                'contacts',
                JSON.stringify({ data: filteredData, time: Date.now() }),
            );
            setList(filteredData);
        } else setMessage(fetchMessage || error || '');
    }
}