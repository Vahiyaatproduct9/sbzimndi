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
  const [loading, setLoading] = useState<boolean | null>(null);
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
    setLoading(true);
    const fetch_orders = async () => {
      let local_orders;
      try {
        local_orders = await AsyncStorage.getItem('orders')
          .then(res => (res ? JSON.parse(res) : null))
          .catch(async e => {
            console.log('error in orders: ', e);
            await AsyncStorage.removeItem('orders');
          });
      } catch (e) {
        local_orders = null;
      }
      if (local_orders?.length > 0) setOrders(local_orders);
      console.log('local_orders', local_orders);
      console.log('Running orders ....');
    };
    fetch_orders().then(async () => {
      const res = await listOrders();
      if (res?.success) {
        setOrders(res.data);
        setLoading(null);
      } else {
        setMessage(`${res?.error || 'Some Error occured.'}`);
        setLoading(false);
      }
      console.log('res from orders: ', res);
    });
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
      ) : loading === false ? (
        <Text style={css.bold}>Something went Wrong! X{'('}</Text>
      ) : loading === true ? (
        <Text style={css.bold}>Loading...</Text>
      ) : (
        <Text style={css.bold}>Hang on.. No Orders Yet...</Text>
      )}
    </ScrollView>
  );
};

export default Orders;
