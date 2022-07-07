import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllRequisition from './AllRequisition';
import RequisitionDetails from './RequisitionDetails';
import AddRequisition from './AddRequisition';

const Stack = createNativeStackNavigator();

const Requisitions = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllRequisitions" component={AllRequisition} />
      <Stack.Screen name="RequisitionDetails" component={RequisitionDetails} />
      <Stack.Screen name="AddRequisition" component={AddRequisition} />
    </Stack.Navigator>
  );
};

export default Requisitions;
