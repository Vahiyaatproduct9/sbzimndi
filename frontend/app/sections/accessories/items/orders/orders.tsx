import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import listOrders from '../../../../../api/listOrders';
import { orders_bought_by } from '../../../../../types/types';
import Message from '../../../../components/message/message';
import css from './orders.css';
// import { getRelativeTime } from '../../../../functions/getRelativeTime';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import conversation from '../../../../../api/conversation';
import theme from '../../../../../colors/ColorScheme';
import calculateDistance from '../../../../functions/calculateDistance';
import getRelativeDistance from '../../../../functions/getRelativeDistance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLocationStore from '../../../../store/useLocationStore';
const Orders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<null | undefined | orders_bought_by[]>();
  const [message, setMessage] = useState<string>('');
  const { setLocation, latitude, longitude, accuracy } = useLocationStore();
  useEffect(() => {
    (async () => {
      if (!latitude || !longitude || !accuracy) {
        await setLocation();
        console.log('ran location.');
      }
    })();
  }, [accuracy, latitude, setLocation, longitude]);

  useEffect(() => {
    const fetch_orders = async () => {
      const local_orders = await AsyncStorage.getItem('orders')
        .then(res => JSON.parse(res || ''))
        .catch(e => {
          console.log('error in orders: ', e);
          return null;
        });
      console.log('local_orders', local_orders);
      const res = await listOrders();
      if (local_orders?.length > 0) setOrders(local_orders);
      if (res?.success) setOrders(res.data);
      else setMessage(`${res?.error || 'Some Error occured.'}`);
      console.log('res from orders: ', res);
    };
    fetch_orders();
  }, []);
  useEffect(() => console.log('orders:', orders), [orders]);
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
    } = await conversation.start({ reciever_id, iambuyer });
    if (success) {
      // do somethinf ...
      navigation.goBack();
      navigation.navigate('Messages' as never, { conversation_id });
    } else setMessage(error || fetchMessage);
  };

  function viewProfile({ user_id }: { user_id: string }) {
    console.log('user_id from orders : ', user_id);
    navigation.goBack();
    navigation.navigate('Profile' as never, { user_id });
  }

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
            {longitude && latitude && accuracy
              ? getRelativeDistance(
                  calculateDistance(
                    order.latitude,
                    order.longitude,
                    latitude ?? 0,
                    longitude ?? 0,
                  ),
                )
              : 'Distance not available'}
          </Text>
          {/* <Text style={css.date}>Contact</Text> */}
          <View style={css.options}>
            <Pressable
              onPress={() => {
                viewProfile({ user_id: order.users.id });
              }}
            >
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
    </ScrollView>
  );
};

export default Orders;
