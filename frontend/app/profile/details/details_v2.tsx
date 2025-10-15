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
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import checkUser from '../../../api/checkUser.ts';
import { getName } from '../../functions/getLocalInfo.ts';
import {
  imageProperty,
  spiritProperty,
  svgProperty,
  textProperty,
  transform,
  settingsProperty,
  animatedStyle,
} from '../../animation/animation.ts';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
// import getProfile from '../../../api/getProfile.ts';
import { spirit } from '../../data/spiritAnimals.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getProfile from '../../../api/getProfile.ts';

const Details = ({ route }: any) => {
  const navigation = useNavigation();
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const { setLogged, user_id } = route.params;
  const isFocused = useIsFocused();
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const [profile, setProfile] = useState<any>(null);
  // setProfile(nProfile);
  useEffect(() => {
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
  }, [setLogged]);

  useEffect(() => {
    console.log('route params from details: ', setLogged, user_id);
    if (user_id) setIsMyProfile(false);
    else setIsMyProfile(true);
  }, [user_id, setLogged]);

  useEffect(() => {
    // getProfilee..
    (async () => {
      if (user_id) {
        console.log('user id detcted. runing this section. ');
        const userProfile = await getProfile({ user_id });
        console.log('userProfile: ', userProfile);
        if (userProfile.success) {
          setProfile(userProfile);
        }
      } else {
        const localProfile = await AsyncStorage.getItem('profile').then(res =>
          JSON.parse(res || ''),
        );
        console.log('localProfile from details_v2:', localProfile);
        if (localProfile) {
          setProfile(localProfile);
        } else {
          const fetchProfile = await getProfile({
            access_token: null,
            user_id: null,
          });
          if (fetchProfile?.success) {
            setProfile(fetchProfile);
          }
        }
      }
    })();
  }, [isFocused, isMyProfile, user_id]);
  return (
    <View style={css.container}>
      <View style={css.head}>
        <Animation.View
          style={[css.settingsView, settingsProperty, animatedStyle]}
        >
          {isMyProfile && (
            <Pressable onPress={() => navigation.navigate('settings' as never)}>
              <View>
                <Ionicons
                  name="settings-outline"
                  size={32}
                  color={css.settingsView.color}
                />
              </View>
            </Pressable>
          )}
        </Animation.View>
        {profile && (
          <Animation.Image
            source={
              profile?.data?.profile_picture
                ? { uri: profile?.data?.profile_picture }
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
            source={spirit(profile ? profile?.data?.spirit_animal : 'cheetah')}
            style={[css.spirit, spiritProperty]}
          />
        )}

        <View style={css.bodySectionContainer}>
          <View style={css.bodySection}>
            <AntDesign name="eye" size={16} color={Theme.text} />
            <Text style={[css.bodyTxt]}>Name</Text>
          </View>
          <Text style={css.bodySectionContent}>
            {profile ? profile?.data?.full_name : getName() || 'Loading ...'}
          </Text>
        </View>
        <View style={css.bodySectionContainer}>
          <View style={css.bodySection}>
            <Feather name="user" size={16} color={Theme.text} />
            <Text style={[css.bodyTxt]}>Role</Text>
          </View>
          <Text style={css.bodySectionContent}>
            {profile
              ? profile?.data?.user_type === 'buyer'
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
            {profile ? profile?.data?.items.length : 'Loading ...'}
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
        {isMyProfile && (
          <Pressable
            style={css.button}
            onPress={() =>
              navigation.navigate('editProfile' as never, { profile })
            }
          >
            <Text style={css.buttonText}>Edit Profile</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Details;
