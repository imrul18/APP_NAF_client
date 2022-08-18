import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import ClientCompanyMachinesService from '../../../../../services/ClientCompanyMachinesService';

const AllMachines = () => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();

  const getClientComapnyMachines = async () => {
    const res = await ClientCompanyMachinesService.getAll();
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getClientComapnyMachines();
  }, [isFocused]);

  useEffect(() => {
    setSearchData(data);
  }, [data]);

  const searchFilter = val => {
    const filter = data.filter(item => {
      let str =
        item?.model?.machine?.name + item?.model?.name + item?.mfg_number;
      return str.toLowerCase().includes(val.toLowerCase());
    });
    setSearchData(filter);
  };

  const Machine = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardtitle}>
          <Text>Machine</Text>
          <Text>Model</Text>
          <Text>MFG Number</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{item?.model?.machine?.name}</Text>
          <Text>{item?.model?.name}</Text>
          <Text>{item?.mfg_number}</Text>
        </View>
      </View>
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
            renderItem={Machine}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getClientComapnyMachines}
              />
            }
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
