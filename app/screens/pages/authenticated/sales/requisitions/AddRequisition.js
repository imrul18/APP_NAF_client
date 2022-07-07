import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CompanyInfo from './add_requisition/CompanyInfo';
import Information from './add_requisition/Information';
import TypeInfo from './add_requisition/TypeInfo';
import PartHadingsInfo from './add_requisition/PartHadingsInfo';

const Stack = createNativeStackNavigator();

const AddRequisition = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="companyInfo" component={CompanyInfo} />
        <Stack.Screen name="information" component={Information} />
        <Stack.Screen name="typeInfo" component={TypeInfo} />
        <Stack.Screen name="partHeadings" component={PartHadingsInfo} />
      </Stack.Navigator>
    </>
  );
};

export default AddRequisition;
