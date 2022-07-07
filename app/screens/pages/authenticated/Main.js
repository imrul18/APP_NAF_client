import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Menu from './Menu';
import Notification from './Notification';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="menu" component={Menu} />
      <Stack.Screen name="notification" component={Notification} />
    </Stack.Navigator>
  );
};

export default Main;
