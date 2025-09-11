// import { View, Text } from 'react-native';
import React from 'react';
import SignUp from './signup';
import Kyc from '../kyc/kyc';

const MainPage = () => {
  const [activePage, setActivePage] = React.useState<'signup' | 'kyc'>(
    'signup',
  );

  return activePage === 'signup' ? (
    <SignUp setActivePage={setActivePage} />
  ) : (
    <Kyc />
  );
};

export default MainPage;
