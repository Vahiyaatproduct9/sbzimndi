import { Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import css from './payment.css';
import PaymentButton from './paymentButton/paymentButton';
import timeline from '../../../functions/timeline';
import Message from '../../../components/message/message';

const Payment = ({
  route,
}: {
  route: {
    params: {
      item: any;
      setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    };
  };
}) => {
  const { item, setActiveTab } = route.params;
  const [pressed, setPressed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  console.log(item);
  return (
    <View style={css.container}>
      <Message state={setMessage} content={message} time={3} />
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
        <View style={css.note}>
          <Text style={css.noteText}>
            Note:
            <Text style={{ fontWeight: 500 }}>
              {' '}
              We currently do NOT support home delivery but are working on it.
              Hang around! You have to go pickup the order yourself :(
            </Text>
          </Text>
        </View>
      </View>
      <PaymentButton
        item={item}
        setMessage={setMessage}
        textStyle={css.buttonText}
        setPressed={setPressed}
        setActiveTab={setActiveTab}
        style={[css.paymentButton, pressed && css.pressed]}
      />
    </View>
  );
};

export default Payment;
