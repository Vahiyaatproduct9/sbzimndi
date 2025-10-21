import { View } from 'react-native';
import css from './orderConfirmed.css';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
const OrderConfirmed = () => {
  const containerOpacity = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const iconOpacity = useSharedValue(0);
  const textTransform = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const animateContainer = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });
  const animateLogo = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
    };
  });
  const animateIcon = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
    };
  });
  const animateText = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: textTransform.value }],
      opacity: textOpacity.value,
    };
  });
  useEffect(() => {
    containerOpacity.value = withTiming(1, { duration: 500 }, () => {
      logoOpacity.value = withTiming(1, { duration: 500 }, () => {
        logoOpacity.value = withTiming(0, { duration: 500 });
        iconOpacity.value = withTiming(1, { duration: 500 }, () => {
          textOpacity.value = withTiming(1, { duration: 500 });
          textTransform.value = withTiming(10, { duration: 500 });
        });
      });
    });
  }, [logoOpacity, containerOpacity, iconOpacity, textOpacity, textTransform]);
  return (
    <Animated.View style={[css.container, animateContainer]}>
      <View style={css.block}>
        <Animated.Image
          source={require('../../../../../../assets/images/fruit.png')}
          style={[css.logo, animateLogo]}
        />
        <Animated.View style={[css.block2, animateIcon]}>
          <Ionicons name="checkmark-done-circle" style={css.icon} />
          <Animated.Text style={[css.text, animateText]}>
            Transaction Complete
          </Animated.Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default OrderConfirmed;
