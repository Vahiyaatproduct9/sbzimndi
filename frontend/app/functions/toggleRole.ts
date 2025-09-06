import AsyncStorage from "@react-native-async-storage/async-storage";
export default async function saveRole(role: string){
    await AsyncStorage.setItem('role', role)
}
export const getRole = async () =>{
    return await AsyncStorage.getItem('role')
}