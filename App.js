import React from 'react';
import {Provider} from 'react-redux';
import Store from './app/ReduxStore/Store.js';

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

import Auth from './app/screens/pages/Auth.js';

const App = () => {
  return (
    <Provider store={Store}>
      <Auth />
    </Provider>
  );
};

export default App;
