import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Requisitions from './requisitions/Requisitions';
import Quotation from './quotations/Quotation';
import Invoices from './invoices/Invoices';

// import Requisitions from "./requisitions/Requisitions";
// import Quotations from "./quotations/Quotations";
// import Invoices from "./invoices/Invoices";
// import DelivaryNotes from "./deliverynotes/DelivaryNotes";
const Tab = createBottomTabNavigator();

const Sales = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Requisitions"
        component={Requisitions}
        options={{
          tabBarIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <FontAwesome name="wpforms" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Quotations"
        component={Quotation}
        options={{
          tabBarIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <FontAwesome5 name="money-bill" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Invoices"
        component={Invoices}
        options={{
          tabBarIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return (
              <FontAwesome5 name="credit-card" size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Sales;
