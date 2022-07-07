import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import CompanyService from '../../../../../../services/CompanyService';
import {loadData} from '../../../../../../ReduxStore/RequisitionStore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CompanyInfo = ({navigation}) => {
  const dispatch = useDispatch();
  const {requisitionData} = useSelector(state => state.requisitionStore);

  const [data, setData] = useState(requisitionData);

  const handleChange = (value, name) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const [machineModels, setMachineModels] = useState([]);


  const getMachineModels = async () => {
    let dt = await CompanyService.getClientMachines();
    dt = dt.data;
    dt = dt.map(itm => ({name: itm?.name, id: itm?.id}));
    setMachineModels(dt);
  };

  useEffect(() => {
    getMachineModels();
  }, []);

  const nextPage = () => {
    if (data.machine_id.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Field',
        text2: 'Select at least 1 Machine...',
        position: 'top',
      });
    } else {
      dispatch(loadData(data));
      navigation.navigate('information');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TextInput
          style={styles.ref}
          placeholder="Ref Number"
          value={data.ref_number}
          onChangeText={value => {
            handleChange(value, 'ref_number');
          }}
        />
        <Text style={styles.date}>
          Date: {moment(new Date()).format('YYYY-MM-DD')}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={{alignItems: 'center'}}>
          <Text>
            Machine:<Text style={{color: 'red'}}>*</Text>
          </Text>
          <View
            style={{
              width: 250,
              marginLeft: 15,
              borderWidth: 1,
              padding: 5,
              paddingBottom: 0,
              borderRadius: 10,
            }}>
            <MultiSelect
              hideTags
              items={machineModels}
              uniqueKey="id"
              onSelectedItemsChange={item => handleChange(item, 'machine_id')}
              selectedItems={data.machine_id}
              selectText="Pick Items"
              searchInputPlaceholderText="Search..."
              altFontFamily="ProximaNova-Light"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              submitButtonColor="#DC3545"
              submitButtonText="Close"
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextPage}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Next
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
  heading: {
    height: windowHeight * 0.1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    height: windowHeight * 0.7,
    alignItems: 'center',
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
  // inputtxt: {
  //   width: windowWidth * 0.7,
  //   height: 50,
  //   margin: 5,
  //   borderWidth: 2,
  //   borderRadius: 10,
  //   textAlign: 'center',
  // },
  // datetime: {
  //   width: 165,
  //   height: 28,
  //   marginLeft: 15,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding: 5,
  //   fontWeight: '700',
  // },
  inputselecttxt: {
    width: windowWidth * 0.3,
  },

  inputselect: {
    width: windowWidth * 0.7,
    padding: 0,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  // selectmultiple: {
  //   width: 200,
  //   backgroundColor: 'red',
  // },
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

export default CompanyInfo;
