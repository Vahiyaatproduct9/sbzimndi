import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  useWindowDimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import css from './css.ts';
import Feather from 'react-native-vector-icons/Feather';
import Animated, { withSpring, useSharedValue } from 'react-native-reanimated';
import search from '../../api/search.ts';
import { requestLocationPermission } from '../../api/getLocation.ts';
import useLocationStore from '../store/useLocationStore.ts';
import getRelativeDay from '../functions/timeline.ts';
import getRelativeDistance from '../functions/getRelativeDistance.ts';
import Message from '../components/message/message.tsx';
import { SearchResult } from '../../types/types';
import distanceColor from '../functions/distanceColor.ts';
import { useNavigation } from '@react-navigation/native';
const Search = () => {
  const navigation = useNavigation();
  const { setLocation, latitude, longitude } = useLocationStore();
  const [searchContent, setSearchContent] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [mess, setMess] = useState<string>('');
  const searchBarProperty = {
    width: useSharedValue(0),
    opacity: useSharedValue(0),
  };
  const searchButton = {
    width: useSharedValue(0),
    opacity: useSharedValue(0),
  };
  const width = useWindowDimensions().width;
  useEffect(() => {
    // Animation for the next 2 lines
    searchBarProperty.width.value = withSpring(width);
    searchBarProperty.opacity.value = withSpring(1);

    // Getting location from coarse location
    const setLoc = async () => {
      const permissionGranted = await requestLocationPermission();
      permissionGranted && (await setLocation());
    };
    setLoc();
    // This is the time elapsed to NOT continue searching
  }, [searchBarProperty.opacity, searchBarProperty.width, setLocation, width]);
  useEffect(() => {
    if (searchContent.length > 0) {
      searchButton.width.value = withSpring(40);
      searchButton.opacity.value = withSpring(1);
    } else {
      searchButton.width.value = withSpring(0);
      searchButton.opacity.value = withSpring(0);
    }
  }, [searchButton.opacity, searchButton.width, searchContent]);
  useEffect(() => {
    setSearchResult(null);
  }, [searchContent]);
  useEffect(() => {
    // the real search function
    const timer = setTimeout(() => {
      if (searchContent.length > 2) {
        const res = async () =>
          await search({
            longitude: longitude ?? 0,
            latitude: latitude ?? 0,
            query: searchContent,
          }).then(result => {
            setSearchResult(result?.status === 200 ? result?.result : null);
            console.log('searchResult -> ', result);
          });
        res();
      }
      console.log(searchResult);
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, searchContent]);
  function viewProduct(id: string) {
    console.log('view Product');
    navigation.navigate('productPage', { id });
  }
  // NEED REDESIGN ASAP. DO IT NOWW.
  const blocks = () => {
    return searchResult && Array.isArray(searchResult) ? (
      searchResult.map(item => {
        return (
          <Pressable
            key={item.item.id}
            onPress={() => viewProduct(item.item.id)}
            style={css.block}
          >
            <Image
              source={{ uri: item.item.image_url }}
              style={css.blockImage}
            />
            <View style={css.blockInfo}>
              <View style={css.blockInfoHead}>
                <View>
                  <Text style={css.itemName}>{item.item.name}</Text>
                  <Text style={css.expiryDate}>
                    Expires {getRelativeDay(item.item.expiry_date)}
                  </Text>
                </View>
                <Text style={css.price}>₹{item.item.price}</Text>
              </View>
              <View style={css.blockInfoInfo}>
                <Text style={css.dateUploaded}>
                  {getRelativeDay(item.item.created_at)}
                </Text>
                <Text
                  style={[
                    css.blockText,
                    {
                      color: distanceColor(item.item.distance_meters),
                    },
                  ]}
                >
                  {getRelativeDistance(item.item.distance_meters)}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })
    ) : (
      <Text>Nothing to show here {':('}</Text>
    );
  };

  return (
    <SafeAreaView>
      <Message content={mess} state={setMess} time={2.5} />
      <View style={css.container}>
        <Animated.View style={[css.header, searchBarProperty]}>
          <TextInput
            value={searchContent}
            onChangeText={setSearchContent}
            style={[css.textInput]}
            placeholder="Search"
          />
          <Animated.View style={[searchButton]}>
            <Pressable style={css.search}>
              <View>
                <Feather name="search" size={32} color={css.container.color} />
              </View>
            </Pressable>
          </Animated.View>
          {/* Hello Everyone I hope everyones doing fine!! */}
        </Animated.View>
        <ScrollView style={css.body}>{blocks()}</ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Search;
