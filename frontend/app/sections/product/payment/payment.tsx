import { Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import css from './payment.css';
import PaymentButton from './paymentButton/paymentButton';
import timeline from '../../../functions/timeline';

const Payment = ({ route }: { route: { params: { item: any } } }) => {
  const { item } = route.params;
  const [pressed, setPressed] = useState<boolean>(false);
  console.log(item);
  return (
    <View style={css.container}>
      <View>
        <Text style={css.header}>Cart</Text>
        <View style={css.box}>
          <View style={css.infoContainer}>
            <Text style={css.title}>{item.name}</Text>
            <Text style={css.title}>${item.price}</Text>
            <Text style={css.text}>Expires {timeline(item.expiry_date)}</Text>
          </View>
          <View style={css.imageContainer}>
            <Image source={{ uri: `${item.image_url}` }} style={css.image} />
          </View>
        </View>
      </View>
      <PaymentButton
        item={item}
        textStyle={css.buttonText}
        setPressed={setPressed}
        style={[css.paymentButton, pressed && css.pressed]}
      />
    </View>
  );
};

export default Payment;
