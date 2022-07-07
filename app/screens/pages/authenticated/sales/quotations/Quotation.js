import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllRequisition from './AllQuotations';
import QuotationDetails from './QuotationDetails';
import QuotationComment from './QuotationComment';

const Stack = createNativeStackNavigator();

const Quotation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllQuotations" component={AllRequisition} />
      <Stack.Screen name="QuotationDetails" component={QuotationDetails} />
      <Stack.Screen name="QuotationComment" component={QuotationComment} />
    </Stack.Navigator>
  );
};

export default Quotation;
