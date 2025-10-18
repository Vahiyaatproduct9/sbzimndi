import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import css from './accessories.css';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import theme from '../../../colors/ColorScheme';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { tabs } from '../../../types/types';
const Accessories = ({
  profile,
  setActiveTab,
}: {
  profile: any;
  setActiveTab: React.Dispatch<React.SetStateAction<tabs>>;
}) => {
  const navigation = useNavigation();

  return (
    <View style={css.container}>
      <Pressable
        style={[css.box, css.profile]}
        onPress={() => setActiveTab('profile')}
      >
        {profile?.data?.profile_picture ? (
          <Image
            source={{ uri: profile?.data?.profile_picture }}
            style={css.profilePicture}
          />
        ) : (
          <FontAwesome name="user-circle" size={28} color={theme.text} />
        )}
        <View style={css.profile_box}>
          <Text style={css.text}>
            {profile?.data?.full_name
              ? String(profile?.data?.full_name).split(' ')[0]
              : 'User'}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={css.box}
        onPress={() => navigation.navigate('Messages' as never)}
      >
        <MaterialIcons name="message" style={css.icons} />
      </Pressable>
      <Pressable
        style={css.box}
        onPress={() => navigation.navigate('Orders' as never)}
      >
        <Octicons name="gift" style={css.icons} />
      </Pressable>
      <Pressable
        style={css.box}
        onPress={() => {
          navigation.navigate('Cart' as never);
          console.log('Kishor')
        }}
      >
        <Feather name="shopping-cart" style={css.icons} />
      </Pressable>
      <Pressable
        style={css.box}
        onPress={() => navigation.navigate('Notifications' as never)}
      >
        <Ionicons name="notifications" style={css.icons} />
      </Pressable>
    </View>
  );
};

export default Accessories;
