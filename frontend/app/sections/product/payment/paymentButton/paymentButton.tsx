import { Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { StyleSheetProperties } from 'react-native';
import initiatePayment from '../../../../../api/initiatePayment';
import theme from '../../../../../colors/ColorScheme';
import rzpCheckout from 'react-native-razorpay';
import verifyPayment from '../../../../../api/verifyPayment';

const PaymentButton = ({
  style,
  textStyle,
  setPressed,
  item,
}: {
  style?: StyleSheetProperties;
  textStyle?: StyleSheetProperties;
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const handleSubmit = async () => {
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
        amount, // in paise
        currency,
        name,
        description: 'SbziMndi',
        handler: function (response: any) {
          console.log('Payment Complete!', response);
          // TODO: send response to backend for signature verification
        },
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
      const { success, message } = await verifyPayment(result);
      if (success) {
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
      style={style}
      disabled={processing}
      onPress={handleSubmit}
    >
      <Text style={textStyle}>{processing ? 'Please wait' : 'Pay'}</Text>
    </Pressable>
  );
};

export default PaymentButton;
