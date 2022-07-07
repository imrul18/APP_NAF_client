import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Config from '../../config';

import axios from 'axios';

let Api = axios.create({
  baseURL: Config.baseUrl,
  headers: {
    'Content-type': 'application/json',
    accept: 'application/json',
  },
  transformResponse: function (data) {
    let response = JSON.parse(data);


    if (response) {
      switch (response.status) {
        case 400:
          Toast.show({
            type: 'error',
            text1: type,
            text2: response.message,
            position: 'bottom',
          });
          break;

        case 401:
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: response.message,
            position: 'bottom',
          });
          break;

        case 422:
          Toast.show({
            type: 'info',
            text1: 'Warning',
            text2: response.message,
            position: 'bottom',
          });
          break;

        case 500:
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: response.message,
            position: 'bottom',
          });
          break;

        case 200:
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: response.message,
            position: 'top',
          });
          break;

        default:
          if (response.errors) {
            var data = 'Error';
            if (response.errors?.name) data = response.errors.name;
            else if (response.errors?.designation_id)
              data = response.errors.designation_id;
            else if (response.errors?.email) data = response.errors.email;

            Toast.show({
              type: 'error',
              text1: response.message,
              text2: data,
              position: 'bottom',
            });
          }
          break;
      }
      const Unauthenticated = async () => {
        await AsyncStorage.removeItem('user');
      };
      if (response?.message === 'Unauthenticated.') {
        Unauthenticated();
      }
    }
    return response;
  },

  validateStatus: function (status) {
    // if (status === 401) {
    //   localStorage.removeItem('user')
    // }
    return status >= 200 && status < 300; // default
  },
});

Api.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${
    JSON.parse(await AsyncStorage.getItem('user'))?.access_token
  }`;
  return config;
});

export default Api;
