// import { View, Text } from 'react-native';
import React from 'react';
import SignUp from './signup';
import Kyc from '../kyc/kyc';
import { signupPage } from '../../../types/signup';
import UploadDocuments from '../documents/uploadDocuments';

const MainPage = () => {
  const [activePage, setActivePage] = React.useState<signupPage>('signup');

  const renderPage = () => {
    switch (activePage) {
      case 'signup':
        return <SignUp setActivePage={setActivePage} />;
      // break;
      case 'kyc':
        return <Kyc setActivePage={setActivePage} />;
      default:
        return <UploadDocuments />;
    }
  };

  return renderPage();
};

export default MainPage;
