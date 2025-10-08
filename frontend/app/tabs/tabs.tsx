import { StyleSheet, Pressable, useWindowDimensions, View } from 'react-native';
import React, { useEffect } from 'react';
import Theme from '../../colors/ColorScheme.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animation, { useSharedValue, withSpring } from 'react-native-reanimated';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../functions/getLocalInfo.ts';
import checkUser from '../../api/checkUser.ts';
import gP from '../../api/getProfile.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import updateFcm from '../functions/updateFcm.ts';

type ActiveTab = 'home' | 'search' | 'add' | 'profile';

interface props {
  active: ActiveTab;
  setActive: React.Dispatch<React.SetStateAction<ActiveTab>>;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  logged: boolean | null;
  setLogged: React.Dispatch<React.SetStateAction<boolean | null>>;
  profile: any;
  isSeller: boolean;
}
const Tabs = (props: props) => {
  useEffect(() => {
    console.log('test');
    const check_user_and_update_profile = async () => {
      try {
        const {
          access_token: newAccessToken,
          // refresh_token: newRefreshToken,
          success,
        } = await checkUser();
        if (success === false) {
          await AsyncStorage.multiRemove([
            'profile',
            'access_token',
            'refresh_token',
          ]).then(() => console.log('removed user 1'));
        }
        const newProfile =
          newAccessToken && newAccessToken.length > 0
            ? await gP(newAccessToken)
            : null;
        if (newProfile && newProfile.success === true) {
          console.log({ 'successful new profile': newProfile });
          props.setProfile(newProfile);
          props.setLogged(true);
          await updateFcm(newProfile.items.fcm_token);
        } else {
          props.setLogged(false);
          await AsyncStorage.multiRemove([
            'profile',
            'access_token',
            'refresh_token',
          ]).then(() => console.log('removed user 2'));
        }
      } catch (e) {
        console.log('Error from tabs: ', e);
        props.setLogged(false);
      }
    };
    check_user_and_update_profile();
  }, []);
  useEffect(() => {
    console.log({ isSeller: props.isSeller });
  }, [props.isSeller]);
  useEffect(() => {
    const timer = setInterval(() => {
      (async () => {
        const access_token = await getAccessToken();
        const refresh_token = await getRefreshToken();
        if (access_token && refresh_token) {
          await checkUser().then(async res => {
            setAccessToken(res.access_token);
            // sAT(res.access_token);
            setRefreshToken(res.refresh_token);
            // sRT(res.refresh_token);
          });
        }
      })();
    }, 600000);
    return clearInterval(timer);
  }, []);
  const animateProperty = {
    width: useSharedValue(20),
    borderRadius: useSharedValue(200),
    bottom: useSharedValue(20),
  };
  const w = useWindowDimensions();
  useEffect(() => {
    animateProperty.width.value = withSpring(w.width);
    animateProperty.borderRadius.value = withSpring(0);
    animateProperty.bottom.value = withSpring(0);
  }, [
    animateProperty.borderRadius,
    animateProperty.bottom,
    animateProperty.width,
    w.width,
  ]);

  return (
    <View style={css.box}>
      <Animation.View
        style={[
          css.container,
          {
            width: animateProperty.width,
            borderRadius: animateProperty.borderRadius,
            bottom: animateProperty.bottom,
          },
        ]}
      >
        <Pressable onPress={() => props.setActive('home')} style={css.button}>
          <Ionicons
            name={props.active === 'home' ? 'home' : 'home-outline'}
            size={30}
            color="#353535ff"
          />
        </Pressable>
        <Pressable onPress={() => props.setActive('search')} style={css.button}>
          <Ionicons
            name={props.active === 'search' ? 'search' : 'search-outline'}
            size={30}
            color="#353535ff"
          />
        </Pressable>
        {props.logged &&
          props.profile !== null &&
          props.profile.items.upi_id.length > 0 &&
          props.profile.items.upi_name.length > 0 &&
          props.isSeller && (
            <Pressable
              onPress={() => props.setActive('add')}
              style={css.button}
            >
              <Ionicons
                name={
                  props.active === 'add'
                    ? 'add-circle-sharp'
                    : 'add-circle-outline'
                }
                size={30}
                color="#353535ff"
              />
            </Pressable>
          )}
        <Pressable
          onPress={() => props.setActive('profile')}
          style={css.button}
        >
          <Ionicons
            name={props.active === 'profile' ? 'person' : 'person-outline'}
            size={30}
            color="#353535ff"
          />
        </Pressable>
      </Animation.View>
    </View>
  );
};

const css = StyleSheet.create({
  box: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    position: 'relative',
    left: 0,
    right: 0,
    backgroundColor: Theme.tint,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Tabs;
