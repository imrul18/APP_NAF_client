import {useIsFocused} from '@react-navigation/native';
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
  RefreshControl,
} from 'react-native';
import ClientQuotationService from '../../../../../services/ClientQuotationService';

const AllQuotations = ({navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();

  const getQuotations = async () => {
    const res = await ClientQuotationService.getAll({page: currentPage});
    setCurrentPage(res.meta.current_page + 1);
    setLastPage(res.meta.last_page);
    let y = data.concat(res.data);
    setData(y);
    setLoading(false);
  };

  useEffect(() => {
    getQuotations();
  }, [isFocused]);

  useEffect(() => {
    setSearchData(data);
  }, [data]);

  const searchFilter = val => {
    const filter = data.filter(item => {
      let str =
        item?.pq_number +
        (item?.invoice ? 'Yes' : 'No') +
        (item?.locked_at ? 'Locked' : 'On Going');
      return str.toLowerCase().includes(val.toLowerCase());
    });
    setSearchData(filter);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await ClientQuotationService.getAll({page: 1});
    setCurrentPage(res.meta.current_page + 1);
    setLastPage(res.meta.last_page);
    setData(res.data);
    setRefreshing(false);
  };

  const Requisition = ({item}) => {
    var statuscolor =
      item?.status == 'pending'
        ? '#F0AD4E'
        : item?.status == 'rejected'
        ? '#D9534F'
        : '#5CB85C';
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('QuotationDetails', {id: item.id});
        }}>
        <View style={styles.cardtitle}>
          <Text>Quotation ID</Text>
          <Text>Status</Text>
          <Text>Requisition Type</Text>
          <Text>Lock</Text>
          <Text>Invoice</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{item?.pq_number}</Text>
          <Text style={{...styles.status, backgroundColor: statuscolor}}>
            {item?.status
              ? item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)
              : '--'}
          </Text>
          <Text>
            {item?.requisition?.type == 'claim_report'
              ? 'Claim Report'
              : 'Puchase Request'}
          </Text>

          <Text>{item?.locked_at ? 'Locked' : 'On Going'}</Text>
          <Text>{item?.invoice ? 'Yes' : 'No'}</Text>
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
            renderItem={Requisition}
            keyExtractor={item => item?.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={() => {
              if (currentPage > lastPage) return;
              else getQuotations();
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
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 70,
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
  status: {
    color: '#fff',
    borderRadius: 2,
    textAlign: 'center',
  },
});
export default AllQuotations;
