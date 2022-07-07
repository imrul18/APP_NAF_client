import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import WelcomePage from './auth/WelcomePage';
import Login from './auth/Login';
import Main from './authenticated/Main';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="welcome" component={WelcomePage} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="authenticated" component={Main} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default Auth;
