import AsyncStorage from "@react-native-async-storage/async-storage";
export async function getName() {
    const name = await AsyncStorage.getItem('name')
    if (name) return name
    else return ''
}
export async function setName(name: string) {
    await AsyncStorage.setItem('name', name)
}

export async function getEmail() {
    const email = await AsyncStorage.getItem('email')
    if (email) return email
    else return ''
}
export async function setEmail(email: string) {
    await AsyncStorage.setItem('email', email)
}
export async function getBio() {
    const bio = await AsyncStorage.getItem('bio')
    if (bio) return bio
    else return ''
}
export async function setBio(bio: string) {
    await AsyncStorage.setItem('bio', bio)
}