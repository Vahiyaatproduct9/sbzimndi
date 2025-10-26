import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './productPage.css';
import getItem from '../../../api/getItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Message from '../../components/message/message';
import calculateDistance from '../../functions/calculateDistance';
import MtoKm from '../../functions/meterstokm';
import timeline from '../../functions/timeline';
import useLocationStore from '../../store/useLocationStore';
import theme from '../../../colors/ColorScheme';
import { order, User } from '../../../types/types';
import { useNavigation } from '@react-navigation/native';
import { useProfileStore } from '../../store/useProfileStore';
type enhancedOrder = order & {
  distance_meters: number;
  users: User;
};
const ProductPage = ({ route }: { route: { params: { id: string } } }) => {
  const navigation = useNavigation();
  const profile = useProfileStore(s => s.profile);
  const { setLocation, latitude, longitude, accuracy } = useLocationStore();
  const { id } = route.params;
  const [pressed, setPressed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [item, setItem] = useState<enhancedOrder | null>(null);
  // Startup FUnction below!
  useEffect(() => {
    (async () => await setLocation())();
  }, [setLocation]);
  useEffect(() => {
    (async () =>
      await getItem(id).then(res => setItem(prev => ({ ...prev, ...res }))))();
  }, [id]);
  useEffect(() => {
    const distance_meters = calculateDistance(
      latitude ?? 0,
      longitude ?? 0,
      item?.latitude ?? 0,
      item?.longitude ?? 0,
    );
    setItem((prev: any) => ({ ...prev, distance_meters }));
  }, [latitude, longitude, item?.latitude, item?.longitude]);
  useEffect(() => {
    console.log('item updated', item);
  }, [item]);
  useEffect(() => {
    console.log('location updated', latitude, longitude, accuracy);
  }, [latitude, longitude, accuracy]);
  //Startup function ends !
  const paymentPage = () => {
    if (!profile) {
      setMessage('Please Login to place Order.');
      return;
    }
    navigation.navigate('RzpCheckout', { item });
  };
  return (
    item && (
      <ScrollView
        style={css.container}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Message state={setMessage} content={message} time={3} />
        <View style={css.imageContainer}>
          <Image source={{ uri: item.image_url }} style={css.image} />
        </View>
        <View style={css.infoContainer}>
          <Text style={css.heading}>{item.name}</Text>
        </View>
        <View style={css.priceContainer}>
          <Text style={css.price}>${item.price}</Text>
          <Text style={css.price}>{`expires ${timeline(
            String(item.expiry_date),
          )}`}</Text>
        </View>
        <View style={css.ownerContainer}>
          <Pressable
            style={css.ownerBox}
            onPress={() =>
              navigation.navigate('Profile' as never, {
                user_id: item.user_id,
                iambuyer: true,
              })
            }
          >
            <FontAwesome name="user-circle" size={28} color={theme.text} />
            <Text style={css.owner}>
              {item.users ? item.users.full_name : 'Name'}
            </Text>
          </Pressable>
          <Text style={css.away}>
            {item.distance_meters > 1000
              ? MtoKm(item.distance_meters)
              : item.distance_meters.toFixed(1) + ' m away'}
          </Text>
        </View>
        <View style={css.descContainer}>
          <Text style={css.desc}>
            {item.description ? item.description : 'No description'}
          </Text>
        </View>
        <View style={css.buttonContainer}>
          <Pressable
            style={[css.order, pressed && css.pressed]}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            onPress={paymentPage}
          >
            <Text style={css.orderText}>Buy</Text>
          </Pressable>
        </View>
      </ScrollView>
    )
  );
};

export default ProductPage;
