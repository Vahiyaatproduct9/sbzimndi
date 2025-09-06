import { View, Text, TextInput, Image, Pressable, Switch, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'
import css from '../style/css.ts'
import theme from '../../../colors/ColorScheme.ts'
import { useState } from 'react'
import { signup } from '../../../api/signUp.ts'
import Message from '../../components/message/message.tsx'
const image = require('../../../assets/images/fruit.png')
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUp = ({ navigation }: any) => {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    // const []
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repass, setRepass] = useState<string>('')
    const [lctnEnbld, setLctnEnbld] = useState<boolean>(false)
    const [reS, setRes] = useState<string>('')
    const [location, setLocation] = useState<Array<number>>([0, 0, 0])
    const [pressed, setPressed] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean | null>(null)
    const locationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            return granted === PermissionsAndroid.RESULTS.GRANTED
        }
        return true
    }

    useEffect(() => {
        if (lctnEnbld) {
            const getUserLocation = async () => {
                const hasPermission = await locationPermission()
                if (!hasPermission) {
                    setLctnEnbld(false)
                };
            }
            const d = async () => await getUserLocation()
            d()
            Geolocation.getCurrentPosition(
                (position) => {
                    setLoading(true)
                    setLocation([position.coords.longitude, position.coords.latitude, position.coords.accuracy])
                },
                (e) => setLoading(null),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
            )
        }
        console.log(location)
    }, [lctnEnbld])

    const handleSubmit = async () => {
        setLoading(true)
        const info = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            password,
            repass,
            location: {
                long: location[0],
                lat: location[1],
                acc: location[2]
            }
        }
        const data = async () => {
            const res = await signup(info)
            return res
        }
        await data().then(res => {
            if (typeof res !== 'undefined') {
                setRes(res)
                console.log(res)
                if (res === 'Registered! :D') {
                    const doit = async () => {
                        await AsyncStorage.setItem('email', email)
                        await AsyncStorage.setItem('password', password)
                        await AsyncStorage.setItem('name', name)
                        await AsyncStorage.setItem('phone', phone)
                        await AsyncStorage.setItem('location', JSON.stringify(location))
                    }
                    doit()
                    if (res === 'Registered! :D') navigation.navigate('otp')
                    setLoading(null)
                }
            }
            else {
                setRes('invalid')
            }
        })
        setLoading(false)

    }
    return (
        <View style={css.container}>
            <Message content={reS} time={3} state={setRes} />
            <View style={css.header}>
                <Image style={css.Image} source={image} />
                <Text style={css.headerText}>SbziMndi</Text>
            </View>
            <View style={css.inputContainer}>
                <Text style={css.BtnTxt}>Name:</Text>
                <TextInput style={css.inputText} placeholder='Ramesh Mahata' value={name} onChangeText={setName} />
            </View>
            <View style={css.inputContainer}>
                <Text style={css.BtnTxt}>Email:</Text>
                <TextInput style={css.inputText} placeholder='someone@gmail.com' value={email.trim()} onChangeText={setEmail} />
            </View>
            <View style={css.inputContainer}>
                <Text style={css.BtnTxt}>Phone:</Text>
                <TextInput style={css.inputText} keyboardType='numeric' placeholder='9029938400' value={phone.trim()} onChangeText={setPhone} />
            </View>
            <View style={css.inputContainer}>
                <Text style={css.BtnTxt}>Password:</Text>
                <TextInput style={css.inputText} placeholder='••••••••' secureTextEntry value={password} onChangeText={setPassword} />
            </View>
            <View style={css.inputContainer}>
                <Text style={css.BtnTxt}>Confirm Password:</Text>
                <TextInput style={css.inputText} placeholder='••••••••' secureTextEntry value={repass} onChangeText={setRepass} />
            </View>
            <View style={[css.inputContainer, css.locationContainer]}>
                <Switch
                    trackColor={{ false: "#767577", true: theme.extra }}
                    thumbColor={lctnEnbld ? theme.tint : "#f4f3f4"}
                    onValueChange={() => { setLctnEnbld(prev => !prev) }} // This function updates the state
                    value={lctnEnbld} // This controls the current state of the switch
                />
                <Text style={css.BtnTxt}>Enable Location</Text>
            </View>
            <Pressable style={[css.button, pressed ? css.buttonPressed : css.buttonUnpressed]} onPressIn={() => setPressed(true)} disabled={loading} onPressOut={() => setPressed(false)}
                onPress={handleSubmit}
            >
                <Text style={css.BtnTxt}>{loading === null ? 'Sign Up' : (loading ? 'Processing...' : 'Try again?')}</Text>
            </Pressable>
            <View>
                <Text style={css.footer}><Pressable style={{ justifyContent: 'center' }} onPress={() => { navigation.navigate('signin') }}>
                    <Text style={{ fontWeight: '600', color: 'orange' }}>Sign In{'  '}</Text></Pressable>Instead?</Text>
            </View>
        </View>
    )
}

export default SignUp