import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

import ClientContractService from '../../../../../services/ClientContractService';

const AllMachines = ({navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();

  const getContract = async () => {
    setLoading(true);
    const res = await ClientContractService.getAll({page: currentPage});
    setCurrentPage(res.data.meta.current_page + 1);
    setLastPage(res.data.meta.last_page);
    let y = data.concat(res.data.data);
    setData(y);
    setLoading(false);
  };

  useEffect(() => {
    getContract();
  }, [isFocused]);

  useEffect(() => {
    setSearchData(data);
  }, [data]);

  const searchFilter = val => {
    const filter = data.filter(item => {
      let str = item?.status ? 'active' : 'inactive';
      return str.toLowerCase().includes(val.toLowerCase());
    });
    setSearchData(filter);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await ClientContractService.getAll({page: 1});
    setCurrentPage(res.data.meta.current_page + 1);
    setLastPage(res.data.meta.last_page);
    setData(res.data.data);
    setLoading(false);
    setRefreshing(false);
  };

  const Contract = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('ContractDetails', {id: item.id});
        }}>
        <View style={styles.cardtitle}>
          <Text>{item?.is_foc ? 'Installation' : 'Contract'} Date</Text>
          <Text>Expriation Date</Text>
          <Text>Status</Text>
          <Text>FOC</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{moment(item?.start_date).format('YYYY-MM-DD')}</Text>
          <Text>
            {moment(item?.end_date).format('YYYY-MM-DD')}
            {item?.has_expired ? '(Expired)' : ''}
          </Text>
          <Text>{item?.status ? 'active' : 'inactive'}</Text>
          <Text>{item?.is_foc ? 'Yes' : 'No'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchboxcontainer}>
        <View style={styles.searchbox}>
          <TextInput
            onChangeText={val => searchFilter(val)}
            style={styles.searchtext}
            placeholder="Search"
          />
        </View>
      </View>

      <View style={styles.cardContainer}>
        {searchData?.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchData}
            renderItem={Contract}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={() => {
              if (currentPage > lastPage) return;
              else getContract();
            }}
          />
        ) : (
          <Text style={styles.notfound}>No data Found</Text>
        )}
      </View>

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
  searchboxcontainer: {
    backgroundColor: '#0e5eb5',
  },
  searchbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardtitle: {
    paddingRight: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  carddetails: {
    paddingLeft: 20,
  },
  notfound: {
    textAlign: 'center',
    margin: 20,
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
export default AllMachines;
