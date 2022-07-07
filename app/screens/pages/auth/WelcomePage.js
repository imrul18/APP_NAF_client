import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import RNExitApp from 'react-native-exit-app';

import {loadUserFromLocal} from '../../../ReduxStore/AuthStore';

const WelcomePage = ({navigation}) => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const [isConnect, setIsConnect] = useState(false);
  const Auth = async () => {
    var carry = await AsyncStorage.getItem('user');
    carry = JSON.parse(carry);
    if (carry?.access_token) {
      dispatch(loadUserFromLocal(carry.user));
      navigation.navigate('authenticated');
    } else {
      navigation.navigate('login');
    }
  };
  useEffect(() => {
    if (netInfo.isConnected != null) {
      if (netInfo.isConnected) {
        Auth();
      } else {
        setIsConnect(true);
      }
    }
  }, [netInfo.isConnected]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="red" />
      <Modal animationType="slide" transparent={true} visible={isConnect}>
        <View style={styles.loginModalVIew}>
          <Text>No Internet Connection...</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              RNExitApp.exitApp();
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Exit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginModalVIew: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 300,
    borderRadius: 20,
  },
  btn: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#1F9EF7',
  },
});

export default WelcomePage;
