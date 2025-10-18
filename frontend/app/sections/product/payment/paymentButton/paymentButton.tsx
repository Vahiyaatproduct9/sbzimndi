import { Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { StyleSheetProperties } from 'react-native';
import initiatePayment from '../../../../../api/initiatePayment';
import theme from '../../../../../colors/ColorScheme';
import rzpCheckout from 'react-native-razorpay';
import verifyPayment from '../../../../../api/verifyPayment';
import {
  getAccessToken,
  getEmail,
  getName,
  getPhone,
  getRefreshToken,
} from '../../../../functions/getLocalInfo';
import css from '../payment.css';
import { tabs } from 'types/types';

const PaymentButton = ({
  setMessage,
  pressed,
  setPressed,
  setActiveTab,
  item,
}: {
  style?: StyleSheetProperties;
  textStyle?: StyleSheetProperties;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setActiveTab: React.Dispatch<React.SetStateAction<tabs>>;
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
  pressed: boolean;
  item: any;
}) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const handleSubmit = async () => {
    const access_token = await getAccessToken().then(res =>
      res !== null ? res : '',
    );
    const Pname = await getName();
    const email = await getEmail();
    const contact = await getPhone();
    if ((await getRefreshToken()) === '' || (await getAccessToken()) === '') {
      setMessage('Please Login to buy a product.');
      setTimeout(() => setActiveTab('profile'), 1800);
      return;
    }
    try {
      setProcessing(true);
      const { key, order_id, amount, currency, name } = await initiatePayment(
        item.id,
      )
        .then(r => r)
        .catch(err => console.log(err));
      const options = {
        key,
        order_id, // Razorpay order_id (from backend)
        amount, // in paisa
        currency,
        name,
        description: 'SbziMndi',
        prefill: {
          name: Pname,
          email,
          contact,
        },
        theme: {
          color: theme.tint,
        },
      };
      const result = await rzpCheckout.open(options);
      console.log({ result, access_token });
      const { success, message } = await verifyPayment({
        result,
        access_token,
      });
      setMessage(message);
      if (success) {
        setTimeout(() => setActiveTab('home'), 2000);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[css.paymentButton, pressed && css.pressed]}
      disabled={processing}
      onPress={handleSubmit}
    >
      <Text style={css.buttonText}>{processing ? 'Please wait' : 'Pay'}</Text>
    </Pressable>
  );
};

export default PaymentButton;
