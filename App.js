import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';
import Main from './src/pages/Main';

export default function App() {
  return (
    <>
      <StatusBar translucent={true} backgroundColor='rgba(0, 0, 0, 0.5)' />
      <Routes />
    </>
  );
}
