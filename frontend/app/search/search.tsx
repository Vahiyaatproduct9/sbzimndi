import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchMain from './searchMain';
import ProductPage from '../sections/product/productPage';
import LoadingScreen from '../loadingScreen';
import Payment from '../sections/product/payment/payment';
const Stack = createNativeStackNavigator();
const Search = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="search" component={SearchMain} />
        <Stack.Screen
          name="productPage"
          component={ProductPage}
          initialParams={{ id: null }}
        />
        <Stack.Screen
          name="RzpCheckout"
          component={Payment}
          initialParams={{ item: null }}
        />

        <Stack.Screen name="loading" component={LoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Search;
