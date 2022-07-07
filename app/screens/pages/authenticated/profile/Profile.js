import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.authStore);

  return (
    <View style={styles.container}>
      <View style={styles.firsthalf}>
        <Image
          style={styles.image}
          source={{
            uri: user?.avatar,
          }}
        />
      </View>
      <View style={styles.secondhalf}>
        <Text style={styles.text}>{user?.name}</Text>
        <View style={styles.details}>
          {user?.phone && (
            <View style={styles.detailsinfo}>
              <Ionicons name="call" size={28} color="#0e5eb5" />
              <Text style={{padding: 5, paddingLeft: 20}}>{user?.phone}</Text>
            </View>
          )}
          {user?.email && (
            <View style={styles.detailsinfo}>
              <Ionicons name="mail" size={28} color="#0e5eb5" />
              <Text style={{padding: 5, paddingLeft: 20}}>{user?.email}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  firsthalf: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0e5eb5',
    height: windowHeight * 0.4,
    width: windowWidth,
  },
  image: {
    height: windowHeight * 0.25,
    width: windowHeight * 0.25,
    margin: 5,
    marginTop: 20,
    borderRadius: windowHeight * 0.25,
    borderWidth: 5,
    borderColor: '#fff',
  },

  secondhalf: {
    flex: 2,
    alignItems: 'center',
  },
  text: {
    color: '#0e5eb5',
    padding: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },
  details: {
    width: windowWidth * 0.6,
    marginTop: 10,
  },
  detailsinfo: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingVertical: 10,
  },
  editButton: {
    margin: 50,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#0e5eb5s',
    borderWidth: 2,
    width: 150,
  },
  editButtontxt: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Profile;
