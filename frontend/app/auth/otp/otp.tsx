import { Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import verifyWithOTP from '../../../api/verifyWithOTP.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from '../../components/message/message.tsx';
import css from './css.ts';
import { useProfileStore } from '../../store/useProfileStore.ts';
import { tabs } from 'types/types';

const Otp = ({
  route,
}: {
  route: {
    params: { setActiveTab: React.Dispatch<React.SetStateAction<tabs>> };
  };
}) => {
  const { setActiveTab } = route.params;
  const [pressed, setPressed] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const refreshProfile = useProfileStore(s => s.refreshProfile);
  const handleSubmit = async () => {
    setLoading(true);
    if (otp.length === 6) {
      const email = await AsyncStorage.getItem('email');
      const { success, access_token, refresh_token } = await verifyWithOTP({
        email: email ? email : '',
        token: otp,
      });
      if (success === 200) {
        await refreshProfile({ access_token, refresh_token, setMessage });
        setActiveTab('home');
      }
    } else {
      setMessage('Incorrect PIN!');
    }
    setLoading(false);
  };
  return (
    <View style={css.container}>
      <Message content={message} time={3} state={setMessage} />
      <Text style={css.head}>OTP Confirmation</Text>
      <Text style={css.subHead}>
        We sent you a confirmation code in your email :D
      </Text>
      <View style={css.body}>
        <TextInput
          style={css.textinput}
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          placeholder="Enter OTP"
        />
        <View style={css.buttonView}>
          <Pressable
            style={[
              css.button,
              pressed ? css.buttonPressed : css.buttonUnpressed,
            ]}
            onPress={handleSubmit}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
          >
            <Text style={css.btntxt}>
              {loading === true
                ? 'Verifying...'
                : loading === false
                ? 'Try Again?'
                : 'Verify'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Otp;
