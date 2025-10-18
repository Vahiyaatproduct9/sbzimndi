import { StyleSheet, Pressable, useWindowDimensions, View } from 'react-native';
import React, { useEffect } from 'react';
import Theme from '../../colors/ColorScheme.ts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animation, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useProfileStore } from '../store/useProfileStore.ts';
type ActiveTab = 'home' | 'search' | 'add' | 'profile';
import useLocationStore from '../store/useLocationStore.ts';
import { requestLocationPermission } from '../../api/getLocation.ts';

interface props {
  active: ActiveTab;
  setActive: React.Dispatch<React.SetStateAction<ActiveTab>>;
}
const Tabs = (props: props) => {
  const refreshProfile = useProfileStore(s => s.refreshProfile);
  const setLocation = useLocationStore(s => s.setLocation);
  const profile = useProfileStore(s => s.profile);
  useEffect(() => {
    (async () => {
      await requestLocationPermission();
      await setLocation();
    })();
  }, [setLocation]);
  useEffect(() => {
    try {
      (async () => await refreshProfile({}))()
    } catch (error) {
      console.log("Can't refresh profile.");
    }
    console.log('profile from tabs: ', profile);
  }, [refreshProfile]);
  useEffect(() => {
    const timer = setInterval(async () => {
      await refreshProfile({});
    }, 600000);
    return () => { clearInterval(timer) };
  }, [refreshProfile]);
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
        {profile?.data?.upi_id && profile?.data?.user_type === 'seller' && (
          <Pressable onPress={() => props.setActive('add')} style={css.button}>
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
