import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import ClientContractService from '../../../../../services/ClientContractService';

const ContractDetails = ({route}) => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  const getContract = async () => {
    setData(await ClientContractService.get(route.params.id));
    setLoading(false);
  };

  useEffect(() => {
    getContract();
  }, []);

  const machineList = item => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <Text>{item?.item?.model?.name}</Text>
        <Text>{item?.item?.mfg_number}</Text>
        <Text style={{paddingRight: 10}}>{item?.item?.model?.space ?? "xx"}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardtitle}>
          <Text>{data?.is_foc ? 'Installation' : 'Contract'} Date</Text>
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
          <Text>{moment(data?.start_date).format('YYYY-MM-DD')}</Text>
          <Text>
            {moment(data?.end_date).format('YYYY-MM-DD')}
            {data?.has_expired ? '(Expired)' : ''}
          </Text>
          <Text>{data?.status ? 'active' : 'inactive'}</Text>
          <Text>{data?.is_foc ? 'Yes' : 'No'}</Text>
        </View>
      </View>

      <View style={styles.machineCard}>
        <Text style={{fontSize: 24, fontWeight: '700', textAlign: 'center'}}>
          Machine List
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{fontWeight: '700'}}>Name</Text>
          <Text style={{paddingLeft: 30, fontWeight: '700'}}>MFG Number</Text>
          <Text style={{fontWeight: '700'}}>Space</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.machine_models}
          renderItem={machineList}
          keyExtractor={item => item?.id}
        />
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

  machineCard: {
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
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

export default ContractDetails;
