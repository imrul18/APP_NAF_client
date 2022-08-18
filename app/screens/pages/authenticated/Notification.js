import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationService from '../../../services/NotificationService';
import {useIsFocused} from '@react-navigation/native';

const Notification = ({navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState();

  const [data, setData] = useState([]);

  const getNotification = async () => {
    setLoading(true);
    const res = await NotificationService.getAll(currentPage+1);
    setCurrentPage(res.current_page);
    setLastPage(res.last_page);
    let y = data.concat(res.data);
    setData(y);
    setLoading(false);
  };

  useEffect(() => {
    if(data.length<1) getNotification();
  }, []);

  

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await NotificationService.getAll(1);
    setCurrentPage(res.current_page);
    setLastPage(res.last_page);
    setData(res.data);
    setLoading(false);
    setRefreshing(false);
  };

  const pageNavigate = async item => {
    await NotificationService.readAt(item?.item?.id);

    let arr = item.item.data?.app?.screens;
    let length = arr?.length;
    let data = item.item.data?.app?.id;

    const nav = i => {
      let object = {
        screen: arr[i],
      };
      if (i + 1 < length) {
        object.params = nav(i + 1);
      } else {
        object.params = {id: data};
      }
      return object;
    };
    if (item.item.data.app) {
      let path = nav(0);
      navigation.navigate('menu', path);
    }
  };

  const notificationList = item => {
    const backColor = item?.item?.read_at ? '#fff' : '#efffff';
    return (
      <TouchableOpacity
        onPress={() => pageNavigate(item)}
        style={{...styles.notificationContainer, backgroundColor: backColor}}>
        <View style={{marginLeft: 10}}>
          <View>
            <Text style={{fontSize: 16, color: '#000'}}>
              {item?.item?.data?.message}
            </Text>
          </View>
          <Text>
            {item?.item?.data?.message} by {item?.item?.data?.user?.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 12}}>
              {moment(item?.item?.updated_at).format('YYYY-MM-DD')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.comment}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold', padding: 5}}>
            Notifications ({data?.length})
          </Text>
        </View>
      </View>

      {data?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={notificationList}
          keyExtractor={item => item?.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (currentPage >= lastPage) return;
            else getNotification();
          }}
        />
      ) : (
        <View style={{alignItems: 'center', marginTop: 250}}>
          <Text>No comment found</Text>
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.loginModalView}>
          <ActivityIndicator size="large" color="red" />
          <Text>Please Wait...</Text>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  comment: {
    height: 60,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  notificationContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },

  image: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    margin: 5,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#fff',
  },

  commentbox: {
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 300,
  },

  loginModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 300,
    borderRadius: 20,
  },
});

export default Notification;
