import http from './http-common';
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async data => {
  const res = await http.post('login', data);
  if (res.data.access_token) {
    await AsyncStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

const logout = async () => {
  await AsyncStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;
