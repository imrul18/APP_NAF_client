import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import logo from '../../../../assets/media/logos/naf.png';
import backgroundimage from './../../../../assets/media/illustrations/sketchy-1/13.png';

const Dahsboard = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.intro}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.welcometxt}>Welcome to NAF Inventory</Text>
          <Text style={styles.decstxt}>
            Naf Group is one of the most prestigious and experienced commercial
            and industrial conglomerates in Bangladesh today
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    height: windowHeight,
    backgroundColor: '#f2c98a',
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  },
  intro: {
    height: windowHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    height: windowHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    height: windowHeight * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcometxt: {
    margin: 20,
    fontSize: 24,
    fontWeight: '700',
  },
  decstxt: {
    fontSize: 16,
    paddingHorizontal: 25,
    textAlign: 'center',
    fontWeight: '500',
  },
  txtinput: {
    borderWidth: 2,
    width: windowWidth * 0.6,
    height: 40,
    margin: 5,
    borderRadius: 10,
    textAlign: 'center',
  },
  loginbtn: {
    margin: 5,
    backgroundColor: '#1F9EF7',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  loginbtntxt: {
    color: '#eee',
    fontSize: 20,
    fontWeight: '700',
  },
  forgettxt: {
    color: '#1F9EF7',
    fontSize: 20,
    fontFamily: 'sans-serif',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: '#f2c98a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'blue',
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
});

export default Dahsboard;
