import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import SearchableDropdown from 'react-native-searchable-dropdown';
import PartService from '../../../../../../services/PartService';
import {loadData} from '../../../../../../ReduxStore/RequisitionStore';
import CompanyService from '../../../../../../services/CompanyService';
import ClientRequisitionService from '../../../../../../services/ClientRequisitionService';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PartHadingsInfo = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {requisitionData} = useSelector(state => state.requisitionStore);

  const [items, setItems] = useState();

  const getParts = async () => {
    let res = await PartService.getClientPart();
    let carryData = res.data.map(item => ({...item, quantity: 1}));
    setItems(carryData);
  };

  useEffect(() => {
    getParts();
  }, []);

  const [selectedItem, setSelectedItem] = useState([]);

  const onSubmit = async () => {
    if (!selectedItem.length) {
      Toast.show({
        type: 'error',
        text1: 'Invalid',
        text2: 'Empty Part List',
        position: 'top',
      });
    } else {
      let dt = await CompanyService.getClientCompany();

      await ClientRequisitionService.create({
        ...requisitionData,
        company_id: dt.data.id,
        part_items: selectedItem,
      });
      dispatch(
        loadData({
          company_id: '',
          engineer_id: '',
          machine_id: [],
          priority: '',
          type: '',
          payment_mode: '',
          expected_delivery: '',
          payment_term: '',
          payment_partial_mode: '',
          partial_time: '',
          next_payment: '',
          ref_number: '',
          machine_problems: '',
          solutions: '',
          reason_of_trouble: '',
          remarks: '',
          part_items: [],
        }),
      );
      navigation.navigate('AllRequisitions');
    }
  };

  const PartList = ({item}) => {
    return (
      <View
        key={item.id}
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginVertical: 5,
        }}>
        <Text style={{...styles.partlistItem, width: 180}}>{item.name}</Text>
        <View style={{width: 100, alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Feather
              name="minus-circle"
              size={20}
              color={item.quantity > 1 ? '#000' : '#efefef'}
              onPress={() => {
                if (item.quantity > 1) {
                  const tempList = [...selectedItem];
                  const tempItem = tempList.filter(val => val.id === item.id);
                  tempItem[0].quantity--;
                  setSelectedItem(tempList);
                }
              }}
            />

            <Text style={{paddingHorizontal: 10}}>{item.quantity}</Text>
            <Feather
              name="plus-circle"
              size={20}
              color="black"
              onPress={() => {
                const tempList = [...selectedItem];
                const tempItem = tempList.filter(val => val.id === item.id);
                tempItem[0].quantity++;
                setSelectedItem(tempList);
              }}
            />
          </View>
        </View>

        <TouchableOpacity style={{alignItems: 'center', width: 50}}>
          <MaterialIcons
            name="delete-outline"
            size={20}
            color="red"
            onPress={() => {
              var carry = items;
              carry.push(item);
              setItems(carry);
              var remainItems = selectedItem.filter(itm => itm != item);
              setSelectedItem(remainItems);
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{height: 180, alignItems: 'center'}}>
          <SearchableDropdown
            onItemSelect={item => {
              var carry = selectedItem;
              carry.push(item);
              setSelectedItem(carry);
              var remainItems = items.filter(itm => itm != item);
              setItems(remainItems);
            }}
            containerStyle={{padding: 5, width: 300}}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{color: '#292'}}
            itemsContainerStyle={{maxHeight: 140}}
            items={items}
            resetValue={false}
            textInputProps={{
              placeholder: 'Search Part Headings',
              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              },
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>

        <Text style={styles.partlistHeader}>Part List</Text>
        <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
          <Text style={{...styles.partlistHeading, width: 180}}>Item</Text>
          <Text style={{...styles.partlistHeading, width: 100}}>Quantity</Text>
          <Text style={{...styles.partlistHeading, width: 50}}>Action</Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={selectedItem}
          renderItem={PartList}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Prev
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  body: {
    height: windowHeight * 0.8,
  },
  footer: {
    height: windowHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  ref: {
    textAlign: 'center',
    width: windowWidth * 0.4,
    borderWidth: 1,
    padding: 0,
    margin: 10,
    borderRadius: 10,
  },
  date: {
    paddingHorizontal: windowWidth * 0.15,
  },
  partlistHeader: {
    textAlign: 'center',
    fontSize: 24,
    margin: 10,
    fontWeight: '700',
  },
  partlistHeading: {
    fontWeight: '600',
    textAlign: 'center',
  },
  partlistItem: {
    textAlign: 'center',
  },
  button: {
    width: 80,
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#0e5eb5',
    borderColor: '#0e5eb5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PartHadingsInfo;
