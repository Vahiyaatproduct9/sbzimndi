import AsyncStorage from "@react-native-async-storage/async-storage";
import conversation from "../../api/conversation";
import { Profile, User } from "../../types/types";
interface enhancedUser extends User {
    last_message: string | null;
    last_message_at: string | null;
    conversation_id: string;
    my_id: string;
}
interface contacts {
    data: enhancedUser[],
    time: number
};
import mapChats from "./mapChats";
import React from "react";
export default async ({ setList, setMessage, profile }: {
    setList: React.Dispatch<React.SetStateAction<enhancedUser[] | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    profile: Profile | null
}) => {
    let contacts: contacts | null
    try {
        try {
            const local_contacts: contacts | null = await AsyncStorage.getItem('contacts').then(res =>
                JSON.parse(res || ''),
            );
            console.log('Local contact: ', local_contacts)
            contacts = local_contacts;
        }
        catch (err) {
            contacts = null;
            console.error('Error from getContacts:', err)
        }
        console.log('contacts: ', contacts)
        if (contacts && contacts?.time - Date.now() > 600000) {
            setList(Array.from(new Set(contacts.data)));
        } else {
            console.log('running')
            const {
                success,
                data,
                error,
                message: fetchMessage,
            } = await conversation.list();
            if (success && profile !== null) {
                const filteredData: enhancedUser[] = mapChats({ data, profile });
                await AsyncStorage.setItem(
                    'contacts',
                    JSON.stringify({
                        data:
                            setList(Array.from(new Set(filteredData))), time: Date.now()
                    }),
                );
                setList(Array.from(new Set(filteredData)));;
            } else setMessage(fetchMessage || error || '');
        }
    } catch (error) {
        console.error('Error in getCOntacts: ', error)
    }
}