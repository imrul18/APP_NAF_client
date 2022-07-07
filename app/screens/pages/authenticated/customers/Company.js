import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllMachines from './machines/AllMachines';
import Contracts from './contracts/Contracts';


const Tab = createBottomTabNavigator();

const Company = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Machines"
        component={AllMachines}
        options={{
          tabBarIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <FontAwesome5 name="cogs" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Contracts"
        component={Contracts}
        options={{
          tabBarIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <Ionicons name="document" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Company;
