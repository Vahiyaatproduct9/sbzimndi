// import { View, Text } from 'react-native';
import React from 'react';
import SignUp from './signup';
import Kyc from '../kyc/kyc';
import { signupPage } from '../../../types/types';
import UploadDocuments from '../documents/uploadDocuments';
import Upi from '../upi/upi';

const MainPage = () => {
  const [activePage, setActivePage] = React.useState<signupPage>('signup');

  const renderPage = () => {
    switch (activePage) {
      case 'signup':
        return <SignUp setActivePage={setActivePage} />;
      // break;
      case 'kyc':
        return <Kyc setActivePage={setActivePage} />;
      case 'UPI':
        return <Upi />;
      default:
        return <UploadDocuments />;
    }
  };

  return renderPage();
};

export default MainPage;
