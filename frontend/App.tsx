import Main from './app/main.tsx';
import LoadingScreen from './app/loadingScreen.tsx';
import { StyleSheet, View } from 'react-native';
import Theme from './colors/ColorScheme.ts';
import { useEffect, useState } from 'react';
import Tabs from './app/tabs/tabs.tsx';
import Search from './app/search/search.tsx';
import Profile from './app/profile/profile.tsx';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import AddItem from './app/addItem/addItem.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type activeTab = 'home' | 'search' | 'add' | 'profile';

function App() {
  const [logged, setLogged] = useState<boolean | null>(null);
  // const [isSeller, setSeller] = useState<boolean>(false);
  const animateProperty = {
    y: useSharedValue(80),
    opacity: useSharedValue(0),
  };
  const [active, setActive] = useState<activeTab>('home');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setLoaded(true);
    animateProperty.y.value = withSpring(0);
    animateProperty.opacity.value = withSpring(1);
  }, [animateProperty.opacity, animateProperty.y]);
  useEffect(() => {
    (async () =>
      await AsyncStorage.setItem('profile', JSON.stringify(profile)))();
  }, [profile]);
  const activeBlock = () => {
    if (active === 'home') {
      return <Main setActiveTab={setActive} />;
    } else if (active === 'search') {
      return <Search />;
    } else if (active === 'add') {
      return <AddItem setActiveTab={setActive} />;
    } else if (active === 'profile') {
      return (
        <Profile
          logged={logged}
          profile={profile}
          setLogged={setLogged}
          setProfile={setProfile}
          setActiveTab={setActive}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {loaded ? (
        <>
          <Animated.View
            style={{
              width: '100%',
              position: 'absolute',
              top: animateProperty.y,
              opacity: animateProperty.opacity,
              height: '100%',
            }}
          >
            {activeBlock()}
          </Animated.View>
          <Tabs
            setProfile={setProfile}
            setLogged={setLogged}
            logged={logged}
            active={active}
            setActive={setActive}
            profile={profile}
            isSeller={
              profile
                ? profile.items.user_type === 'seller'
                  ? true
                  : false
                : false
            }
          />
        </>
      ) : (
        <LoadingScreen />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.backgroundColor,
  },
});

export default App;
