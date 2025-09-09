import { Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { StyleSheetProperties } from 'react-native';
import initiatePayment from '../../../../../api/initiatePayment';
import theme from '../../../../../colors/ColorScheme';
import rzpCheckout from 'react-native-razorpay';
import verifyPayment from '../../../../../api/verifyPayment';
import { getAccessToken, getName } from '../../../../functions/getLocalInfo';

const PaymentButton = ({
  style,
  setMessage,
  textStyle,
  setPressed,
  setActiveTab,
  item,
}: {
  style?: StyleSheetProperties;
  textStyle?: StyleSheetProperties;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const handleSubmit = async () => {
    if ((await getName()) === '' || (await getAccessToken()) === '') {
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
          name: 'Mohan roy',
          email: 'something@something.com',
          contact: '1234567890',
        },
        theme: {
          color: theme.tint,
        },
      };
      const result = await rzpCheckout.open(options);
      console.log(result);
      const { message } = await verifyPayment(result);
      setMessage(message);
      console.log(message);
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
      style={style}
      disabled={processing}
      onPress={handleSubmit}
    >
      <Text style={textStyle}>{processing ? 'Please wait' : 'Pay'}</Text>
    </Pressable>
  );
};

export default PaymentButton;
