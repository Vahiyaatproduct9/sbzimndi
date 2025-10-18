import { Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import css from './payment.css';
import PaymentButton from './paymentButton/paymentButton';
import timeline from '../../../functions/timeline';
import Message from '../../../components/message/message';
import { order } from 'types/types';
import getRelativeDistance from '../../../functions/getRelativeDistance';
type enhancedOrder = order & {
  distance_meters: number;
  users: {
    full_name: string | null;
    phone_number: number | string | null;
  };
};
const Payment = ({
  route,
}: {
  route: {
    params: {
      item: enhancedOrder;
      setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    };
  };
}) => {
  const { item, setActiveTab } = route.params;
  const [pressed, setPressed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  console.log('Item from payment.tsx:', item);
  return (
    <View style={css.container}>
      <Message state={setMessage} content={message} time={3} />
      <View>
        <Text style={css.header}>Cart</Text>
        <View style={css.box}>
          <View style={css.infoContainer}>
            <Text style={css.title}>{item.name}</Text>
            <Text style={css.title}>${item.price}</Text>
            <Text style={css.text}>
              Expires {timeline(String(item.expiry_date))}
            </Text>
          </View>
          <View style={css.imageContainer}>
            <Image source={{ uri: `${item.image_url}` }} style={css.image} />
          </View>
        </View>
        <View style={css.contentContainer}>
          <Text style={css.contentHeader}>Details</Text>
          <View style={css.descriptionBox}>
            <Text style={css.descriptionHead}>Distance: </Text>
            <Text style={css.text}>
              {getRelativeDistance(item.distance_meters)}
            </Text>
          </View>
          <View style={css.descriptionBox}>
            <Text style={css.descriptionHead}>Quantity: </Text>
            <Text style={css.text}>{item.quantity}</Text>
          </View>
          <View style={css.descriptionBox}>
            <Text style={css.descriptionHead}>Description: </Text>
            <Text style={css.description}>{item.description}</Text>
          </View>
        </View>
        <View style={css.note}>
          <Text style={css.noteText}>
            Note:
            <Text style={css.text}>
              {' '}
              We currently do NOT support home delivery but are working on it.
              Hang around! The seller and buyer can contact each other and plan
              their meetup.
            </Text>
          </Text>
        </View>
      </View>
      <PaymentButton
        item={item}
        setMessage={setMessage}
        setPressed={setPressed}
        setActiveTab={setActiveTab}
        pressed={pressed}
      />
    </View>
  );
};

export default Payment;
