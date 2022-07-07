import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../../../assets/media/logos/naf.png';

import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import {loadUserFromLocal} from '../../../ReduxStore/AuthStore';
import {useDispatch, useSelector} from 'react-redux';

import Dashboard from './dashboard/deshboard';
import Company from './customers/Company';
import Sales from './sales/Sales';
import Profile from './profile/Profile';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import NotificationService from '../../../services/NotificationService';
import {useIsFocused} from '@react-navigation/native';

const Menu = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [unreadCount, setUnreadCount] = useState(0);
  const getNotification = async () => {
    const res = await NotificationService.getAll();

    let count = 0;
    res.data.forEach(itm => {
      if (itm?.read_at == null) count++;
    });
    setUnreadCount(count);
  };

  useEffect(() => {
    getNotification();
  }, [isFocused]);

  const logout = async () => {
    navigation.navigate('login');
    dispatch(loadUserFromLocal(null));
    await AsyncStorage.removeItem('user');
  };

  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <>
            <Image source={logo} style={styles.logo} />
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <TouchableOpacity style={styles.logout} onPress={logout}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
                <Text style={styles.text}>Logout</Text>
              </TouchableOpacity>
            </DrawerContentScrollView>
          </>
        );
      }}
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate('notification');
            }}>
            {unreadCount > 0 ? (
              <MaterialCommunityIcons
                name="bell-alert"
                size={24}
                color="red"
              />
            ) : (
              <MaterialCommunityIcons name="bell" size={24} color="#0040ff" />
            )}
          </TouchableOpacity>
        ),
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <MaterialIcons name="dashboard" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Company"
        component={Company}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <FontAwesome5 name="sitemap" size={size} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Sales"
        component={Sales}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return (
              <MaterialIcons name="point-of-sale" size={size} color={color} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({focused, size}) => {
            let color = focused ? 'red' : 'black';
            return <FontAwesome5 name="user-tie" size={size} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 20,
  },
  logo: {
    height: 50,
    width: 240,
    margin: 20,
    resizeMode: 'stretch',
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  customItemText: {
    fontSize: 16,
    fontWeight: '700',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#2094C5',
    borderColor: '#2094C5',
    color: '#fff',
  },
  logout: {
    padding: 15,
    paddingLeft: 20,
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 32,
    fontSize: 14,
    color: '#000',
  },
});

export default Menu;
