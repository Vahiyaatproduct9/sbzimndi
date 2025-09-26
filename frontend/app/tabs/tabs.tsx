import { StyleSheet, Pressable, useWindowDimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Theme from '../../colors/ColorScheme.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animation, { useSharedValue, withSpring } from 'react-native-reanimated';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../functions/getLocalInfo.ts';
import checkUser from '../../api/checkUser.ts';
import gP from '../../api/getProfile.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ActiveTab = 'home' | 'search' | 'add' | 'profile';

interface props {
  active: ActiveTab;
  setActive: React.Dispatch<React.SetStateAction<ActiveTab>>;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  logged: boolean | null;
  setLogged: React.Dispatch<React.SetStateAction<boolean | null>>;
  profile: any;
}
const Tabs = (props: props) => {
  // const [refreshTOken, sRT] = useState><string>('')
  // const [accessToken, sAT] = useState><string>('')
  useEffect(() => {
    (async () => {
      console.log('test');
      let access_token = await getAccessToken();
      let refresh_token = await getRefreshToken();
      (async () => {
        const { access_token: newAccessToken, refresh_token: newRefreshToken } =
          await checkUser({ access_token, refresh_token });

        const newProfile =
          newAccessToken.length > 0 ? await gP(newAccessToken) : null;
        if (newProfile) {
          console.log({ newProfile });
          props.setProfile(newProfile);
          await AsyncStorage.setItem('profile', JSON.stringify(newProfile));
        }
        access_token = newAccessToken;
        await setAccessToken(newAccessToken);
        refresh_token = newRefreshToken;
        await setRefreshToken(newRefreshToken);
      })();
      if (
        access_token &&
        access_token.length > 0 &&
        refresh_token &&
        refresh_token.length > 0
      ) {
        props.setLogged(true);
      } else {
        props.setLogged(false);
      }
    })();
  }, []);
  useEffect(() => {
    console.log('hello');
    console.log({ props: props.profile });
  }, [props.profile]);
  useEffect(() => {
    const timer = setInterval(() => {
      (async () => {
        const access_token = await getAccessToken();
        const refresh_token = await getRefreshToken();
        if (access_token && refresh_token) {
          await checkUser({
            access_token,
            refresh_token,
          }).then(async res => {
            setAccessToken(res.access_token);
            // sAT(res.access_token);
            setRefreshToken(res.refresh_token);
            // sRT(res.refresh_token);
          });
        }
      })();
    }, 177000);
    return clearInterval(timer);
  }, []);
  // useEffect(() => {
  //   (async () =>
  //     await AsyncStorage.setItem('profile', JSON.stringify(props.profile)))();
  //   console.log(props.profile);
  // }, [props.profile]);

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
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
          props.profile.items.upi_name.length > 0 && (
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
