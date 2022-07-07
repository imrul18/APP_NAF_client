import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../../assets/media/logos/naf.png';
import backgroundimage from './../../../assets/media/illustrations/sketchy-1/13.png';
import authService from '../../../services/AuthService';
import {loadUser} from './../../../ReduxStore/AuthStore';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const {user} = useSelector(state => state.authStore);

  useEffect(() => {
    if (user) {
      navigation.navigate('authenticated');
    }
  }, [user]);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    setLoginModal(true);
    try {
      const res = await authService.login({
        email: username,
        password: password,
      });
      if (res.user.details) {
        dispatch(loadUser(res.user));
      }else{
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'You are not a Company User',
          position: 'bottom',
        });
      }
      setLoginModal(false);
    } catch (error) {
      setLoginModal(false);
    }
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.intro}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.welcometxt}>Welcome to NAF Inventory</Text>
          <Text style={styles.decstxt}>
            Naf Group is one of the most prestigious and experienced commercial
            and industrial conglomerates in Bangladesh today
          </Text>
        </View>
        <View style={styles.login}>
          <TextInput
            style={styles.txtinput}
            onChangeText={value => setUsername(value)}
            value={username}
            placeholder="username"
          />
          <TextInput
            style={styles.txtinput}
            onChangeText={value => setPassword(value)}
            value={password}
            placeholder="password"
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.loginbtn}>
              <Text style={styles.loginbtntxt}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgettxt}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.background}>
          <ImageBackground
            source={backgroundimage}
            style={styles.backgroundimage}
          />
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={loginModal}>
        <View style={styles.loginModalVIew}>
          <ActivityIndicator size="large" color="red" />
          <Text>Please Wait...</Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundimage: {
    height: windowHeight * 0.4,
    width: windowWidth - windowWidth * 0.2,
  },
  container: {
    height: windowHeight,
    backgroundColor: '#f2c98a',
    flex: 1,
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

export default Login;
