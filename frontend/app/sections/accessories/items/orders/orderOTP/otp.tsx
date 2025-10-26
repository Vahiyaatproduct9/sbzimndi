import { Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import css from './css.ts';
import Message from '../../../../../components/message/message.tsx';
import checkOrderOTP from '../../../../../../api/checkOrderOTP';
import { useNavigation } from '@react-navigation/native';
import sendOrderOTP from '../../../../../../api/sendOrderOTP.ts';

const Otp = ({ route }: any) => {
  const navigation = useNavigation();
  const { item_id } = route.params;
  const [pressed, setPressed] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [isResend, setResend] = useState<boolean | null>(null);
  const handleSubmit = async () => {
    setLoading(true);
    if (otp.length !== 6) {
      setMessage('Please enter a valid OTP.');
      setLoading(false);
      return;
    }
    const verifyOtp = async () => {
      const response = await checkOrderOTP({ item_id, code: otp });
      setMessage(message);
      if (response.success) {
        setLoading(null);
        navigation.goBack();
        navigation.navigate('Confirmed' as never);
      } else {
        setLoading(false);
      }
    };
    verifyOtp();
    // setLoading(false);
  };
  const resend = async () => {
    setResend(true);
    const res = await sendOrderOTP(item_id);
    if (res.success) {
      setResend(null);
    } else setResend(false);
    setMessage(res.message);
  };
  return (
    <View style={css.container}>
      <Message content={message} time={3} state={setMessage} />
      <Text style={css.head}>Order Confirmation</Text>
      <Text style={css.subHead}>Enter Order OTP from the Buyer.</Text>
      <View style={css.body}>
        <TextInput
          style={css.textinput}
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          placeholder="Enter OTP"
        />
        <Pressable style={css.resend} onPress={resend}>
          <Text style={css.resendTxt}>
            {isResend === null
              ? 'Resend OTP?'
              : isResend === false
              ? 'Try again!'
              : 'Sending...'}
          </Text>
        </Pressable>
        <View style={css.buttonView}>
          <Pressable
            style={[
              css.button,
              pressed ? css.buttonPressed : css.buttonUnpressed,
            ]}
            disabled={loading}
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
