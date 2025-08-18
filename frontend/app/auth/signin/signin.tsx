import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import css from '../style/css'
import signIn from '../../../api/signIn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Message from '../../components/message/message'

const SignIn = ({ navigation, route }) => {
    const { setLogged } = route.params;
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean | null>(null)
    const handleSubmit = async () => {
        setLoading(true)
        const { status, access_token, refresh_token, error } = await signIn({ email, password })
        if (status === 200) {
            await AsyncStorage.setItem('refresh_token', refresh_token)
            await AsyncStorage.setItem('access_token', access_token)
            console.log(access_token, refresh_token)
            setLoading(null)
            setMessage('Loading Profile...')
            setLogged(true)
        }
        else {
            setMessage(error)
            setLoading(false)
        }
    }
    return (
        <View style={css.container}>
            <Message content={message} state={setMessage} time={3} />
            <View style={css.header}>
                <Image style={css.Image} source={require('../../../assets/images/fruit.png')} />
                <Text style={css.headerText}>SbziMndi</Text>
            </View>
            <View style={css.inputContainer}>
                <Text style={css.BtnTxt}>Email:</Text>
                <TextInput style={css.inputText} placeholder='someone@gmail.com' value={email} onChangeText={setEmail} />
            </View>
            <View style={css.inputContainer}>
                <Text style={css.BtnTxt}>Password:</Text>
                <TextInput style={css.inputText} placeholder='********' textContentType='password' value={password} onChangeText={setPassword} />
            </View>
            <Pressable
                onPress={handleSubmit}
                disabled={loading === true}
                style={css.button}>
                <Text style={css.BtnTxt}>{loading === true ?
                    'Signing In...' : (
                        loading === false ? 'Try Again?' : 'Sign In')}
                </Text>
            </Pressable>
            <View>
                <Text style={css.footer}><Pressable style={{ justifyContent: 'center' }} onPress={() => { navigation.navigate('signup') }}>
                    <Text style={{ fontWeight: '600', color: 'orange' }}>Sign Up{'  '}</Text></Pressable>Instead?</Text>
            </View>
        </View>
    )
}

export default SignIn