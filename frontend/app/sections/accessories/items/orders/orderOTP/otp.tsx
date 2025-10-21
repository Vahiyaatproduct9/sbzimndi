import { Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import css from './css.ts';
import Message from '../../../../../components/message/message.tsx';
import checkOrderOTP from '../../../../../../api/checkOrderOTP';
import { useNavigation } from '@react-navigation/native';

const Otp = ({ route }: any) => {
  const navigation = useNavigation();
  const { item_id } = route.params;
  const [pressed, setPressed] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
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
