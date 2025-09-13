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
export async function setIfsc(ifsc: string) {
    await AsyncStorage.setItem('ifsc', ifsc)
}
export async function setAccountNumber(number: string) {
    await AsyncStorage.setItem('accountNumber', number)
}
export async function getIfsc() {
    const ifsc = await AsyncStorage.getItem('ifsc')
    if (ifsc) return ifsc
    else return ''
}
export async function getAccountNumber() {
    const accountNumber = await AsyncStorage.getItem('accountNumber')
    if (accountNumber) return accountNumber
    else return ''
}
export async function setLocation(location: number[]) {
    await AsyncStorage.setItem('location', JSON.stringify(location))
}
export async function getLocation() {
    const location = await AsyncStorage.getItem('location')
    if (location) return JSON.parse(location)
    else return 
}
export async function setPhone(phone: string | number) {
    await AsyncStorage.setItem('phone', phone.toString())
}
export async function getPhone() {
    const phone = await AsyncStorage.getItem('phone')
    if (phone) return phone
    else return ''
}
export async function setPassword(password: string) {
    await AsyncStorage.setItem('password', password)
}
export async function getPassword() {
    const password = await AsyncStorage.getItem('password')
    if (password) return password
    else return ''
}
export async function getBio() {
    const bio = await AsyncStorage.getItem('bio')
    if (bio) return bio
    else return ''
}
export async function setBio(bio: string) {
    await AsyncStorage.setItem('bio', bio)
}

export async function getAccessToken() {
    const access_token = await AsyncStorage.getItem('access_token')
    if (access_token) return access_token
    else return ''
}
export async function setAccessToken(access_token: string) {
    await AsyncStorage.setItem('access_token', access_token)
}

export async function getRefreshToken() {
    const refresh_token = await AsyncStorage.getItem('refresh_token')
    if (refresh_token) return refresh_token
    else return ''
}
export async function setRefreshToken(refresh_token: string) {
    await AsyncStorage.setItem('refresh_token', refresh_token)
}
