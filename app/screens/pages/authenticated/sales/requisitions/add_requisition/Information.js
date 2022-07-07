import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useIsFocused} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import RequisitionService from '../../../../../../services/RequisitionService';
import {loadData} from '../../../../../../ReduxStore/RequisitionStore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Information = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {requisitionData} = useSelector(state => state.requisitionStore);

  const [data, setData] = useState({
    ...requisitionData,
    expected_delivery: new Date(),
  });

  const handleChange = (value, name) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const [startOpen, setStartOpen] = useState(false);

  const [engineersName, setEngineersName] = useState([]);
  const [engineersValue, setEngineersValue] = useState([]);

  const today = new Date();

  const date =
    today.getDate() +
    '-' +
    parseInt(today.getMonth() + 1) +
    '-' +
    today.getFullYear();

  const getEngineers = async () => {
    let dt = await RequisitionService.engineers();
    var carry = dt.map(itm => itm.name);
    setEngineersName(carry);
    carry = dt.map(itm => itm.id);
    setEngineersValue(carry);
  };
  useEffect(() => {
    getEngineers();
  }, []);

  const priorities = {
    name: ['Low', 'Medium', 'High'],
    value: ['low', 'medium', 'high'],
  };

  const nextPage = () => {
    if (data.priority === '') {
      Toast.show({
        type: 'error',
        text1: 'Invalid Field',
        text2: '* Field must be filled!!',
        position: 'top',
      });
    } else {
      dispatch(
        loadData({
          ...data,
          expected_delivery: JSON.stringify(data.expected_delivery),
        }),
      );
      navigation.navigate('typeInfo');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TextInput
          editable={false}
          style={styles.ref}
          value={data.ref_number}
          onChangeText={value => {
            handleChange(value, 'ref_number');
          }}
        />
        <Text style={styles.date}>Date: {date}</Text>
      </View>
      <View style={styles.body}>
        <View style={{height: windowHeight * 0.5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.inputselecttxt}>Engineer:</Text>
            <SelectDropdown
              buttonTextStyle={styles.inputselect}
              data={engineersName}
              onSelect={(selectedItem, index) => {
                handleChange(engineersValue[index], 'engineer_id');
              }}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.inputselecttxt}>
              Priority:<Text style={{color: 'red'}}>*</Text>
            </Text>
            <SelectDropdown
              buttonTextStyle={styles.inputselect}
              data={priorities.name}
              onSelect={(selectedItem, index) => {
                handleChange(priorities.value[index], 'priority');
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={styles.inputselecttxt}>
              Expected Delivery:<Text style={{color: 'red'}}>*</Text>
            </Text>
            <Text
              style={{...styles.inputselect, ...styles.datetime}}
              onPress={() => setStartOpen(true)}>
              {data.expected_delivery.getDate().toString() +
                '-' +
                (data.expected_delivery.getMonth() + 1).toString() +
                '-' +
                data.expected_delivery.getFullYear().toString()}
            </Text>
            <DatePicker
              modal
              mode="date"
              open={startOpen}
              date={data.expected_delivery}
              onConfirm={date => {
                setStartOpen(false);
                handleChange(date, 'expected_delivery');
              }}
              onCancel={() => {
                setStartOpen(false);
              }}
            />
          </View>
          <TextInput
            multiline
            numberOfLines={3}
            style={styles.textinput}
            placeholder="Machine Problems"
            value={data.machine_problems}
            onChangeText={value => {
              handleChange(value, 'machine_problems');
            }}
          />
          <TextInput
            multiline
            numberOfLines={3}
            style={styles.textinput}
            placeholder="Solutions"
            value={data.solutions}
            onChangeText={value => {
              handleChange(value, 'solutions');
            }}
          />
          <TextInput
            multiline
            numberOfLines={3}
            style={styles.textinput}
            placeholder="Reason of Trouble"
            value={data.reason_of_trouble}
            onChangeText={value => {
              handleChange(value, 'reason_of_trouble');
            }}
          />
          <TextInput
            multiline
            numberOfLines={3}
            style={styles.textinput}
            placeholder="Remarks"
            value={data.remarks}
            onChangeText={value => {
              handleChange(value, 'remarks');
            }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Prev
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

  textinput: {
    width: windowWidth * 0.7,
    height: 70,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  datetime: {
    width: 165,
    height: 28,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    fontWeight: '700',
  },
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

export default Information;
