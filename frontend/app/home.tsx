import { StyleSheet, SafeAreaView } from 'react-native';
import React, { SetStateAction, useEffect, useState } from 'react';
import Hero from './sections/hero/hero.tsx';
import Body from './sections/body/body.tsx';
import theme from '../colors/ColorScheme.ts';
import Accessories from './sections/accessories/accessories.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
type activeTab = 'home' | 'search' | 'add' | 'profile';
interface props {
  setActiveTab: React.Dispatch<SetStateAction<activeTab>>;
  profile: any;
}
export default function ({ route }: { route: { params: props } }) {
  const [stateProfile, setStateProfile] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const local_profile = await AsyncStorage.getItem('profile').then(res =>
        JSON.parse(res || ''),
      );
      setStateProfile(local_profile);
    })();
  }, []);
  const { setActiveTab, profile } = route.params;
  // console.log('profile from home.tsx: ', profile);
  return (
    <SafeAreaView style={styles.container}>
      {(profile || stateProfile) && (
        <Accessories
          setActiveTab={setActiveTab}
          profile={profile || stateProfile}
        />
      )}
      <Hero setActiveTab={setActiveTab} />
      <Body />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.backgroundColor,
  },
});
