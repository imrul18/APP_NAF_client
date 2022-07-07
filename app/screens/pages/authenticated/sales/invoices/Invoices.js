import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllInvoices from './AllInvoices';
import InvoiceDetails from './InvoiceDetails';

const Stack = createNativeStackNavigator();

const Invoices = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllInvoices" component={AllInvoices} />
      <Stack.Screen name="InvoiceDetails" component={InvoiceDetails} />
    </Stack.Navigator>
  );
};

export default Invoices;
