import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Theme from '../../../colors/ColorScheme.ts';
import Card from '../../components/Card/card.tsx';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  withSpring,
  useSharedValue,
  withDelay,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from '../../components/message/message.tsx';
import { useNavigation } from '@react-navigation/native';
import getNearestItems from '../../../api/getNearestItems.ts';
import useLocationStore from '../../store/useLocationStore.ts';
import theme from '../../../colors/ColorScheme.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import listOrders from '../../../api/listOrders.ts';

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

  const fetchItems: () => Promise<boolean> = useCallback(async () => {
    const response = await getNearestItems({
      longitude: longitude ?? 0,
      latitude: latitude ?? 0,
      accuracy: accuracy ?? 0,
    });
    if (response.success === true) {
      setItems(response);
      setFetched(true);
      await AsyncStorage.setItem(
        'items',
        JSON.stringify({ ...response, time: Date.now() } || []),
      );
    } else {
      setFetched(false);
      setMessage('Please check your Internet Connection before trying again.');
    }
    return response.success;
  }, [accuracy, latitude, longitude]);
  useEffect((): void => {
    (async () => {
      try {
        const res = await AsyncStorage.getItem('items');
        const parsedRes = res ? JSON.parse(res) : [];
        console.log(parsedRes);
        if (parsedRes) {
          setItems(parsedRes);
          if (Date.now() - parseInt(parsedRes.time, 10) < 600000) {
            return; // cache still valid
          }
        }
        fetchItems();
      } catch (err) {
        console.log('Error in useEffect:', err);
      }
    })();
  }, [accuracy, fetchItems, latitude, longitude]);

  let round = useSharedValue(0);
  const reload = async () => {
    console.log('button pressed');
    const success = await fetchItems();
    if (success) {
      round.value = withSpring(360, { stiffness: 100 }, () => {
        round.value = 0;
      });
    }
  };
  const roundAnim = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${round.value}deg` }],
  }));
  return (
    <Animated.View style={[css.container, containerProperty]}>
      <Message time={3} content={message} state={setMessage} />
      <View style={css.header}>
        <Text style={css.head}>Nearby Picks</Text>
        <Pressable onPress={() => reload()}>
          <Animated.View style={roundAnim}>
            <Ionicons name="reload" size={24} color={theme.text} />
          </Animated.View>
        </Pressable>
      </View>
      {items?.success && items?.data?.length > 0 ? (
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
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ color: Theme.text }}>₹{item.price}</Text>
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
      ) : items?.data?.length === 0 ? (
        <>
          <Text style={css.text}>No Products yet.</Text>
          <Text style={css.text}>We're trying our best! Please Hang On.</Text>
        </>
      ) : items?.success ? (
        <Text style={css.text}>Some Error Occured X{'('}</Text>
      ) : (
        <Text style={css.text}>Loading ...</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  info: {
    marginTop: 10,
  },
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
  text: {
    marginTop: 30,
    color: theme.text,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Body;
