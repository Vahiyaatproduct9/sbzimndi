import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Theme from '../../../colors/ColorScheme.ts';
import Card from '../../components/Card/card.tsx';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  withSpring,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from '../../components/message/message.tsx';
import { useNavigation } from '@react-navigation/native';
import getNearestItems from '../../../api/getNearestItems.ts';
// import { getAndSetLocation } from '../../../api/getLocation.ts';
import useLocationStore from '../../store/useLocationStore.ts';

const Body = () => {
  const navigation = useNavigation();
  const containerProperty = {
    top: useSharedValue(30),
    opacity: useSharedValue(0),
  };
  const [message, setMessage] = useState<string>('');
  const [items, setItems] = useState<any | null>(null);
  const [fetched, setFetched] = useState<boolean | null>(null);
  const { latitude, longitude, accuracy, setLocation } = useLocationStore();
  useEffect(() => {
    containerProperty.opacity.value = withDelay(0, withSpring(1));
    containerProperty.top.value = withDelay(0, withSpring(0));
    (async () => {
      await setLocation();
    })();
    setFetched(false);
  }, [containerProperty.opacity, containerProperty.top, setLocation]);
  useEffect(() => {
    (async () => {
      try {
        const res = await AsyncStorage.getItem('items');
        const parsedRes = res ? JSON.parse(res) : null;
        console.log(parsedRes);
        if (parsedRes) {
          setItems(parsedRes);
          if (Date.now() - parseInt(parsedRes.time, 10) < 600000) {
            return; // cache still valid
          }
        }
        const response = await getNearestItems({
          longitude: longitude ?? 0,
          latitude: latitude ?? 0,
          accuracy: accuracy ?? 0,
        });

        if (response.status === 200) {
          setItems(response);
          await AsyncStorage.setItem(
            'items',
            JSON.stringify({ ...response, time: Date.now() }),
          );
        } else {
          setMessage(
            'Please check your Internet Connection before trying again.',
          );
        }
      } catch (err) {
        console.log('Error in useEffect:', err);
      }
    })();
  }, [accuracy, latitude, longitude]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  useEffect(() => {
    items === null ? setFetched(false) : setFetched(true);
  }, [items]);
  return (
    <Animated.View style={[css.container, containerProperty]}>
      <Message time={3} content={message} state={setMessage} />
      <Text style={css.head}>Nearby Picks</Text>
      {items && typeof items !== 'undefined' ? (
        <View style={css.slider}>
          <FlatList
            data={items.data}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate('Product', { id: item.id })}
              >
                <Card style={css.card}>
                  <Image
                    style={css.Image}
                    source={{ uri: `${item.image_url}` }}
                  />
                  <View style={css.info}>
                    <View style={css.infoinfo}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: Theme.text }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: Theme.text }}>
                          {item.expiry_date}
                        </Text>
                        <Text style={{ color: Theme.text }}>₹{item.price}</Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ color: Theme.text }}>4.7</Text>
                        <AntDesign name="star" size={32} color="gold" />
                      </View>
                    </View>
                  </View>
                </Card>
              </Pressable>
            )}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={css.card.width * 0.8 + 20} // Card width + spacing
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: 0,
            }}
          />
        </View>
      ) : fetched === false ? (
        <Text>Please Connect to the Internet!</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </Animated.View>
  );
};
const css = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  slider: {
    flexDirection: 'row',
  },
  card: {
    height: '100%',
    width: 190,
    flexDirection: 'column',
  },
  head: {
    color: Theme.text,
    fontSize: 23,
    fontWeight: '700',
  },
  Image: {
    backgroundColor: 'red',
    borderRadius: 10,
    height: 150,
    aspectRatio: '1',
  },
  info: {},
  infoinfo: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Theme.extra,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
});

export default Body;
