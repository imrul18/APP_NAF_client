import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllContracts from './AllContracts';
import ContractDetails from './ContractDetails';

const Stack = createNativeStackNavigator();

const Contracts = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllContracts" component={AllContracts} />
      <Stack.Screen name="ContractDetails" component={ContractDetails} />
    </Stack.Navigator>
  );
};

export default Contracts;
