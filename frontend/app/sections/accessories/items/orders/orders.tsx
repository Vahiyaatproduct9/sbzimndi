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
import { useProfileStore } from '../../../../store/useProfileStore';
import distanceColor from '../../../../functions/distanceColor';
import sendOrderOTP from '../../../../../api/sendOrderOTP';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const Block = ({
  order,
  setMessage,
  longitude,
  latitude,
  accuracy,
}: {
  order: orders_bought_by;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  longitude: number | null;
  latitude: number | null;
  accuracy: number | null;
}) => {
  const navigation = useNavigation();
  const [localPressed, setLocalPressed] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const startConversation = async ({
    reciever_id,
  }: {
    reciever_id: string;
  }) => {
    const {
      conversation_id,
      success,
      message: fetchMessage,
      error,
    } = await conversation.start({ reciever_id, iambuyer: false });
    if (success) {
      navigation.goBack();
      navigation.navigate('Messages' as never, { conversation_id });
    } else setMessage(error || fetchMessage);
  };

  function viewProfile({ user_id }: { user_id: string }) {
    console.log('user_id from orders : ', user_id);
    navigation.goBack();
    navigation.navigate('Profile' as never, { user_id });
  }
  const animateWidth = useSharedValue(0);
  const animateOpacity = useSharedValue(0);
  const animateContent = useSharedValue(0);
  useEffect(() => {
    console.log('pressed : ', localPressed);
    if (localPressed) {
      animateWidth.value = withSpring(120, { duration: 800 }, () => {
        animateContent.value = withSpring(0, { duration: 300 });
      });
      animateOpacity.value = withTiming(1, { duration: 800 });
    } else {
      animateWidth.value = withSpring(0, { duration: 800 }, () => {
        animateContent.value = withSpring(100, { duration: 300 });
      });
      animateOpacity.value = withTiming(0, { duration: 800 });
    }
  }, [animateContent, animateOpacity, animateWidth, localPressed]);

  useEffect(() => {
    if (order.order_otp) {
      setOtpSent(true);
    } else setOtpSent(false);
  }, [order]);

  const sendOTP = async (item_id: string) => {
    const { success, message }: { success: boolean; message: string } =
      await sendOrderOTP(item_id);
    setMessage(success ? message : 'Internal Server Error.');
    setLocalPressed(!success);
    setOtpSent(success);
  };
  const navigatetoOrderOTP = (item_id: string) => {
    navigation.navigate('OrderOTP', { item_id });
  };
  // const revokeOrder = async () => {};
  return (
    <View key={order.id} style={css.mainBlock}>
      <View style={css.block}>
        <Image source={{ uri: order.image_url }} style={css.productImage} />
        {!localPressed && (
          <Animated.View style={[css.content, { height: animateContent }]}>
            <Text style={css.buyerName}>{order.users.full_name}</Text>
            <Text style={css.productName}>{order.name}</Text>
            <Text style={css.price}>${order.price}</Text>
          </Animated.View>
        )}
        <View style={css.footer}>
          <Text
            style={[
              css.distance,
              {
                color: distanceColor(
                  calculateDistance(
                    order.latitude,
                    order.longitude,
                    latitude ?? 0,
                    longitude ?? 0,
                  ),
                ),
              },
            ]}
          >
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
          <Pressable
            style={css.optionButton}
            onPress={() => setLocalPressed(prev => !prev)}
          >
            <MaterialIcons name="arrow-back-ios" style={css.optionIcon} />
          </Pressable>
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
            <Pressable
              onPress={() =>
                startConversation({
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
      <Animated.View
        style={[
          css.extraOptions,
          { width: animateWidth, opacity: animateOpacity },
        ]}
      >
        {otpSent ? (
          <Pressable
            style={css.option}
            onPress={() => navigatetoOrderOTP(order.id)}
          >
            <Text style={css.optionText}>Enter OTP</Text>
          </Pressable>
        ) : (
          <Pressable style={css.option} onPress={() => sendOTP(order.id)}>
            <Text style={css.optionText}>Send OTP</Text>
          </Pressable>
        )}
        <Pressable style={[css.option, css.red]}>
          <Text style={[css.optionText]}>Revoke Order</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};
const Orders = () => {
  const [orders, setOrders] = useState<null | undefined | orders_bought_by[]>();
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const access_token = useProfileStore(s => s.access_token);
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
      if (local_orders?.length > 0) {
        setOrders(local_orders);
      }
      console.log('local_orders', local_orders);
      console.log('Running orders ....');
    };
    fetch_orders().then(async () => {
      const res = await listOrders(access_token ?? '');
      if (res?.success) {
        setOrders(res.data);
        setLoading(null);
      } else {
        setMessage(`${res?.error || 'Some Error occured.'}`);
        setLoading(false);
      }
      console.log('res from orders: ', res);
    });
  }, [access_token]);
  // useEffect(() => {
  //   console.log('pressedList:', pressedList);
  // }, [pressedList]);
  useEffect(() => console.log('orders:', orders), [orders]);

  const blocks = () =>
    orders?.map(order => (
      <Block
        key={order.id}
        setMessage={setMessage}
        longitude={longitude}
        latitude={latitude}
        accuracy={accuracy}
        order={order}
      />
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
