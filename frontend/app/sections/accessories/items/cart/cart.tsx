import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './cart.css';
import conversation from '../../../../../api/conversation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cart from '../../../../../api/cart';
import { useProfileStore } from '../../../../store/useProfileStore';
import Message from '../../../../components/message/message';
import { order } from '../../../../../types/types';
import getRelativeDay from '../../../../functions/timeline';
import { getRelativeTime } from '../../../../functions/getRelativeTime';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const access_token = useProfileStore(s => s.access_token);
  const [item, setItem] = useState<any>(null);
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    // fetch Cart Items
    async function fetch_cart_items() {
      const local_list_items: order = await AsyncStorage.getItem('cart').then(
        res => JSON.parse(res || ''),
      );
      if (local_list_items) {
        setItem(local_list_items);
      }
      if (access_token) {
        const remote_list_items = await cart.list(access_token);
        if (remote_list_items?.success) {
          setItem(remote_list_items?.data);
          console.log('fetch list items: ', remote_list_items);
          await AsyncStorage.setItem(
            'cart',
            JSON.stringify(remote_list_items?.data),
          );
        }
      } else {
        setMessage('Please restart the SbziMndi or Login again :(');
        setTimeout(() => {
          console.log('Navigated to Home Screen');
        }, 2000);
      }
    }
    fetch_cart_items();
  }, [access_token]);

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
    // navigation.goBack();
    navigation.navigate('Profile' as never, { user_id });
  }

  useEffect(() => {
    console.log('list items: ', item);
  }, [item]);
  const blocks = () =>
    item && Array.isArray(item) ? (
      item.map((cartItem: order, i: number) => {
        return (
          <View key={i} style={css.block}>
            <View style={css.imageContainer}>
              <Image
                source={require('../../../../../assets/images/sky.png')}
                style={css.image}
              />
            </View>
            <View style={css.contentContainer}>
              <View style={css.content1}>
                <View>
                  <Text style={css.text1}>{cartItem.name}</Text>
                  <Text style={css.text5}>{cartItem.quantity}</Text>
                </View>
                <Text style={css.text3}>
                  Expires {getRelativeDay(String(cartItem.expiry_date))}
                </Text>
              </View>
              <View style={css.content2}>
                <View>
                  <Text style={css.text2}>
                    {getRelativeTime(cartItem.created_at)}
                  </Text>
                  <Text style={css.text4}>₹ {cartItem.price}</Text>
                </View>
                <View style={css.iconBox}>
                  <Pressable style={{ bottom: 20 }}
                    onPress={() => viewProfile({ user_id: cartItem.user_id })}>
                    <MaterialIcons style={css.icon1} name="account-circle" />
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      startConversation({
                        iambuyer: true,
                        reciever_id: cartItem.user_id,
                      })
                    }
                  >
                    <MaterialIcons name="message" size={20} style={css.icon2} />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        );
      })
    ) : (
      <Text>You bought Nothing.</Text>
    );
  // Fix the async function. Remove the async thingy and do whatever the fuck you want.
  return (
    <ScrollView
      style={css.container}
      snapToEnd
      contentContainerStyle={{ padding: 10 }}
    >
      <Message state={setMessage} content={message} time={3} />
      {blocks()}
      <Text>Hey</Text>
    </ScrollView>
  );
};

export default Cart;
