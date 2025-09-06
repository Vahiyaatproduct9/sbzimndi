import { View, Text, useWindowDimensions, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import React, { useEffect, useState } from 'react';
import css from './css_v2.ts';
const image = require('../../../assets/images/sky.png');
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../../../colors/ColorScheme.ts';
import Animation, { withDelay, withSpring } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import checkUser from '../../../api/checkUser.ts';
import { getAccessToken, getName } from '../../functions/getLocalInfo.ts';
import {
  imageProperty,
  spiritProperty,
  svgProperty,
  textProperty,
  transform,
  settingsProperty,
  animatedStyle,
} from '../../animation/animation.ts';
import { getSpirit } from '../../functions/toggleSpiritAnimal.ts';
import { useIsFocused } from '@react-navigation/native';
import getProfile from '../../../api/getProfile.ts';
import { spirit } from '../../data/spiritAnimals.ts';

const Details = ({ navigation, route }: any) => {
  const isFocused = useIsFocused();
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const [spiritAnimal, setSpiritAnimal] = useState<string>('');
  const [profile, setProfile] = useState<any | null>(null);
  useEffect(() => {
    async function res() {
      console.log('executing res');
      const access_token = await AsyncStorage.getItem('access_token');
      const refresh_token = await AsyncStorage.getItem('refresh_token');
      if (
        access_token &&
        access_token.length > 0 &&
        refresh_token &&
        refresh_token.length > 0
      ) {
        const { access_token: at, refresh_token: rt } = await checkUser({
          access_token,
          refresh_token,
        });
        console.log('final ->', await at, await rt);
        if ((await at) === null || (await rt) === null) {
          route.params.setLogged(false);
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('refresh_token');
        } else {
          route.params.setLogged(true);
          await AsyncStorage.setItem('access_token', await at);
          await AsyncStorage.setItem('refresh_token', await rt);
        }
      }
    }
    res();
    imageProperty.top.value = withDelay(500, withSpring(30));
    imageProperty.opacity.value = withDelay(500, withSpring(1));
    spiritProperty.opacity.value = withDelay(500, withSpring(1));
    spiritProperty.right.value = withDelay(500, withSpring(0));
    svgProperty.opacity.value = withDelay(500, withSpring(1));
    svgProperty.left.value = withDelay(500, withSpring(0));
    textProperty.opacity.value = withDelay(500, withSpring(1));
    textProperty.bottom.value = withDelay(500, withSpring(0));
    transform.value = withDelay(500, withSpring(0));
    settingsProperty.opacity.value = withDelay(500, withSpring(1));
  }, []);

  useEffect(() => {
    const d = async () => {
      await getSpirit().then(animal => {
        setSpiritAnimal(animal);
      });
    };
    d();
  }, [isFocused]);

  useEffect(() => {
    const getProf = async () => {
      const access_token = await getAccessToken();
      const profileData = await getProfile(access_token);
      console.log(profileData);
      setProfile(profileData);
    };
    getProf();
  }, []);
  return (
    <View style={css.container}>
      <View style={css.head}>
        <Animation.View
          style={[css.settingsView, settingsProperty, animatedStyle]}
        >
          <Pressable onPress={() => navigation.navigate('settings')}>
            <View>
              <Ionicons
                name="settings-outline"
                size={32}
                color={css.settingsView.color}
              />
            </View>
          </Pressable>
        </Animation.View>
        {profile && (
          <Animation.Image
            source={
              profile.items.profile_picture
                ? { uri: profile.items.profile_picture }
                : image
            }
            style={[css.image, imageProperty]}
          />
        )}
        <Animation.View style={[css.svgContainer, svgProperty]}>
          <Svg style={css.svg} height={height} width={width}>
            <Path
              d={`m 0 100 l 0 ${height - 100} q ${width * 1.4} -${
                height - 100
              } 0 -${height - 100}`}
              fill={css.svg.color}
            />
          </Svg>
        </Animation.View>
      </View>

      <Animation.View style={[css.body, textProperty]}>
        {profile && (
          <Animation.Image
            source={spirit(profile.items.spirit_animal)}
            style={[css.spirit, spiritProperty]}
          />
        )}

        <View style={css.bodySectionContainer}>
          <View style={css.bodySection}>
            <AntDesign name="eye" size={16} color={Theme.text} />
            <Text style={[css.bodyTxt]}>Name</Text>
          </View>
          <Text style={css.bodySectionContent}>
            {profile ? profile.items.full_name : 'Loading '}
          </Text>
        </View>
        <View style={css.bodySectionContainer}>
          <View style={css.bodySection}>
            <Feather name="user" size={16} color={Theme.text} />
            <Text style={[css.bodyTxt]}>Role</Text>
          </View>
          <Text style={css.bodySectionContent}>
            {profile
              ? profile.items.user_type === 'buyer'
                ? 'Buyer'
                : 'Seller'
              : 'Loading ...'}
          </Text>
        </View>
        <View style={css.bodySectionContainer}>
          <View style={css.bodySection}>
            <Entypo name="list" size={16} color={Theme.text} />
            <Text style={[css.bodyTxt]}>Items Sold</Text>
          </View>
          <Text style={css.bodySectionContent}>
            {profile ? profile.items.items.length : 'Loading ...'}
          </Text>
        </View>
        <View style={css.bodySectionContainer}>
          <View style={css.bodySection}>
            <MaterialIcons name="payment" size={16} color={Theme.text} />
            <Text style={[css.bodyTxt]}>Worth</Text>
          </View>
          <Text style={css.bodySectionContent}>{}</Text>
        </View>
        <View style={css.bodySectionContainer}>
          <View style={css.bodySection}>
            <FontAwesome6 name="medal" size={16} color={Theme.text} />
            <Text style={[css.bodyTxt]}>Tier</Text>
          </View>
          <Text style={css.bodySectionContent}>Gold</Text>
        </View>
      </Animation.View>
      <View style={css.foot}>
        <Pressable
          style={css.button}
          onPress={() => navigation.navigate('editProfile')}
        >
          <Text style={css.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Details;
