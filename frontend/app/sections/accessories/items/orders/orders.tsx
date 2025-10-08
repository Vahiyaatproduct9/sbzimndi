import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import listOrders from '../../../../../api/listOrders';
import Message from '../../../../components/message/message';
import { orders_bought_by } from '../../../../../types/signup';
import css from './orders.css';
// import { getRelativeTime } from '../../../../functions/getRelativeTime';
import { getAndSetLocation } from '../../../../../api/getLocation';
import getRelativeDistance from '../../../../functions/getRelativeDistance';
import calculateDistance from '../../../../functions/calculateDistance';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../../../colors/ColorScheme';
import { useNavigation } from '@react-navigation/native';
import getAConversation from '../../../../../api/getAConversation';
const Orders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<null | undefined | orders_bought_by[]>();
  const [message, setMessage] = useState<string>('');
  const [location, setLocation] = useState<number[] | null>(null);
  useEffect(() => {
    (async () => {
      await getAndSetLocation(setLocation);
    })();
  }, []);
  useEffect(() => {
    const fetch_orders = async () => {
      const res = await listOrders();
      if (res?.success) setOrders(res.data);
      else setMessage(`${res?.error || 'Some Error occured.'}`);
    };
    fetch_orders();
  }, []);
  const startConversation = async ({
    iambuyer,
    reciever_id,
  }: {
    iambuyer: boolean;
    reciever_id: string;
  }) => {
    const {
      conversation_id,
      success,
      message: fetchMessage,
      error,
    } = await getAConversation({ iambuyer, reciever_id });
    if (success) {
      // do somethinf ...
      navigation.goBack();
      navigation.navigate('Messages' as never, { conversation_id });
    } else setMessage(error || fetchMessage);
  };

  const blocks = () =>
    orders?.map(order => (
      <View key={order.id} style={css.block}>
        <Image source={{ uri: order.image_url }} style={css.productImage} />
        <View style={css.content}>
          <Text style={css.buyerName}>{order.users.full_name}</Text>
          <Text style={css.productName}>{order.name}</Text>
          <Text style={css.price}>${order.price}</Text>
        </View>
        <View style={css.footer}>
          <Text style={css.distance}>
            {location
              ? getRelativeDistance(
                  calculateDistance(
                    order.latitude,
                    order.longitude,
                    location[0],
                    location[1],
                  ),
                )
              : 'Distance not available'}
          </Text>
          {/* <Text style={css.date}>Contact</Text> */}
          <View style={css.options}>
            <Pressable>
              <MaterialIcons
                style={css.profile}
                name="account-circle"
                size={28}
                color={theme.text}
              />
            </Pressable>
            {/* Add function to navigate to message and create a new conversation. */}
            <Pressable
              onPress={() =>
                startConversation({
                  iambuyer: true,
                  reciever_id: order.users.id,
                })
              }
            >
              <MaterialIcons
                style={css.contact}
                name="message"
                size={28}
                color={theme.text}
              />
            </Pressable>
          </View>
        </View>
      </View>
    ));
  return (
    <ScrollView style={css.container}>
      <Message state={setMessage} content={message} time={3} />
      {orders && orders.length > 0 ? (
        blocks()
      ) : orders?.length === 0 ? (
        <Text style={css.bold}>No Orders Yet.</Text>
      ) : (
        <Text style={css.bold}>Loading...</Text>
      )}
      {/* <Text style={css.bold}>Loading...</Text> */}
    </ScrollView>
  );
};

export default Orders;
