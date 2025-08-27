import { Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import verifyWithOTP from '../../../api/verifyWithOTP.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Message from '../../components/message/message.tsx'
import css from './css.ts'

const Otp = ({ route }) => {
    const { setActiveTab } = route.params;
    const [pressed, setPressed] = useState<boolean>(false)
    const [otp, setOtp] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean | null>(null)
    const handleSubmit = async () => {
        setLoading(true)
        if (otp.length === 6) {
            const email = await AsyncStorage.getItem('email')
            const res = await verifyWithOTP({ email: email ? email : '', token: otp })
            if (res.status === 200) {
                const d = await AsyncStorage.setItem('access_token', res.access_token)
                const r = await AsyncStorage.setItem('refresh_token', res.refresh_token)
                console.log('d -> ', d)
                console.log('refresh_token ->', r)
                setActiveTab('home')
            }
            else {
                setMessage('Incorrect PIN!')
            }
        }
        else {
            setMessage('Incorrect PIN!')
        }
        setLoading(false)
    }
    return (
        <View style={css.container}>
            <Message content={message} time={3} state={setMessage} />
            <Text style={css.head}>OTP Confirmation</Text>
            <Text style={css.subHead}>We sent you a confirmation code in your email :D</Text>
            <View style={css.body}>
                <TextInput style={css.textinput} value={otp}
                    onChangeText={setOtp}
                    keyboardType='number-pad'
                    placeholder='Enter OTP' />
                <View style={css.buttonView}>
                    <Pressable style={[css.button, pressed ? css.buttonPressed : css.buttonUnpressed]} onPress={handleSubmit}
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}
                    >
                        <Text style={css.btntxt}>Verify</Text>
                    </ Pressable>
                </View>
            </View>
        </View>
    )
}

export default Otp