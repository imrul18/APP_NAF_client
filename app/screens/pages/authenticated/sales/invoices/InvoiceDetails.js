import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ClientInvoiceService from '../../../../../services/ClientInvoiceService';

const InvoiceDetails = ({navigation, route}) => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  const getContract = async () => {
    setData(await ClientInvoiceService.get(route.params.id));
    setLoading(false);
  };

  useEffect(() => {
    getContract();
  }, []);

  const machineList = item => {
    return (
      <View style={{...styles.card, padding: 10}}>
        <View style={styles.cardtitle}>
          <Text>Part Name</Text>
          <Text>Part Number</Text>
          <Text>Quantity</Text>
          <Text>Unit</Text>
          <Text>Total</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{item?.item?.part?.aliases[0].name}</Text>
          <Text>{item?.item?.part?.aliases[0].part_number}</Text>
          <Text>{item?.item?.quantity ?? ''}</Text>
          <Text>{item?.item?.unit_value ?? ''}</Text>
          <Text>
            {data?.requisition?.type != 'claim_report'
              ? item?.item?.quantity * item?.item?.unit_value
              : 0}{' '}
            Tk.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{padding: 10, marginHorizontal: 5, flexDirection: 'row'}}
        onPress={() => {
          navigation.navigate('AllInvoices');
        }}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{marginHorizontal: 5, fontSize: 18}}>Invoice Details</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.cardtitle}>
          <Text>Invoice Number</Text>
          <Text>Type</Text>
          <Text>Priority</Text>
          <Text>Invoice Date</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{data?.invoice_number}</Text>
          <Text>
            {data?.requisition?.type == 'claim_report'
              ? 'Claim Report'
              : 'Puchase Request'}
          </Text>
          <Text>{data?.requisition?.priority}</Text>
          <Text>{moment(data?.invoice_date).format('YYYY-MM-DD')}</Text>
        </View>
      </View>

      <View style={styles.machineCard}>
        <Text style={{fontSize: 24, fontWeight: '700', textAlign: 'center'}}>
          Part Items
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.part_items}
        renderItem={machineList}
        keyExtractor={item => item?.id}
      />

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

export default InvoiceDetails;
