import AsyncStorage from "@react-native-async-storage/async-storage";
const spirit_animal = 'spirit_animal'
export async function saveSpirit(img: string) {
    await AsyncStorage.setItem(spirit_animal, img)
}
export async function getSpirit() {
    const spirit = await AsyncStorage.getItem(spirit_animal)
    if (spirit) return spirit
    else return ''
}