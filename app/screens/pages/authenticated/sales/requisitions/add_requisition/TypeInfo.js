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
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {loadData} from '../../../../../../ReduxStore/RequisitionStore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TypeInfo = ({navigation}) => {
  const dispatch = useDispatch();

  const {requisitionData} = useSelector(state => state.requisitionStore);

  const [data, setData] = useState({
    ...requisitionData,
    next_payment: new Date(),
  });

  const handleChange = (value, name) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const [next_payment_date, set_next_payment_date] = useState(false);



  const types = {
    name: ['Claim Report', 'Purchase Request'],
    value: ['claim_report', 'purchase_request'],
  };

  const payments = {
    name: ['Cash', 'Bank', 'Check', 'Card'],
    value: ['cash', 'bank', 'check', 'card'],
  };

  const payment_terms = {
    name: ['Full', 'Half', 'Partial'],
    value: ['full', 'half', 'partial'],
  };

  const payment_partial_mode = {
    name: ['Days', 'Weeks', 'Months', 'Years'],
    value: ['days', 'weeks', 'months', 'years'],
  };

  const nextPage = () => {
    if (data.type === '') {
      Toast.show({
        type: 'error',
        text1: 'Invalid Field',
        text2: '* Field must be filled!!',
        position: 'top',
      });
    } else {
      if (data.type === 'purchase_request') {
        if (data.payment_mode == '' || data.payment_term == '') {
          Toast.show({
            type: 'error',
            text1: 'Invalid Field',
            text2: '* Field must be filled!!',
            position: 'top',
          });
        } else if (data.payment_term === 'partial') {
          if (data.payment_partial_mode == '' || data.partial_time == '') {
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
                next_payment: JSON.stringify(data.next_payment),
              }),
            );
            navigation.navigate('partHeadings');
          }
        } else {
          dispatch(
            loadData({
              ...data,
              next_payment: JSON.stringify(data.next_payment),
            }),
          );
          navigation.navigate('partHeadings');
        }
      } else {
        dispatch(
          loadData({
            ...data,
            next_payment: JSON.stringify(data.next_payment),
          }),
        );
        navigation.navigate('partHeadings');
      }
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
        <Text style={styles.date}>Date: {moment(new Date()).format('YYYY-MM-DD')}</Text>
      </View>
      <View style={styles.body}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.inputselecttxt}>
            Type:<Text style={{color: 'red'}}>*</Text>
          </Text>
          <SelectDropdown
            buttonTextStyle={styles.inputselect}
            data={types.name}
            onSelect={(selectedItem, index) => {
              handleChange(types.value[index], 'type');
            }}
          />
        </View>

        {data.type === 'purchase_request' && (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.inputselecttxt}>
                Payment Mode:<Text style={{color: 'red'}}>*</Text>
              </Text>
              <SelectDropdown
                buttonTextStyle={styles.inputselect}
                data={payments.name}
                onSelect={(selectedItem, index) => {
                  handleChange(payments.value[index], 'payment_mode');
                }}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.inputselecttxt}>
                Payment Term:<Text style={{color: 'red'}}>*</Text>
              </Text>
              <SelectDropdown
                buttonTextStyle={styles.inputselect}
                data={payment_terms.name}
                onSelect={(selectedItem, index) => {
                  handleChange(payment_terms.value[index], 'payment_term');
                }}
              />
            </View>
          </>
        )}

        {data.payment_term === 'partial' && (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.inputselecttxt}>
                Payment Partial Mode:<Text style={{color: 'red'}}>*</Text>
              </Text>
              <SelectDropdown
                buttonTextStyle={styles.inputselect}
                data={payment_partial_mode.name}
                onSelect={(selectedItem, index) => {
                  handleChange(
                    payment_partial_mode.value[index],
                    'payment_partial_mode',
                  );
                }}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.inputselecttxt}>
                Payment Time:<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                style={{
                  width: windowWidth * 0.42,
                  borderWidth: 1,
                  padding: 0,
                  margin: 10,
                  marginLeft: 15,
                  borderRadius: 10,
                  textAlign: 'center',
                }}
                placeholder=""
                value={data.partial_time}
                onChangeText={value => {
                  handleChange(value, 'partial_time');
                }}
                keyboardType="numeric"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text style={styles.inputselecttxt}>Next Payment:</Text>
              <Text
                style={{...styles.inputselect, ...styles.datetime}}
                onPress={() => set_next_payment_date(true)}>
                {data.next_payment.getDate().toString() +
                  '-' +
                  (data.next_payment.getMonth() + 1).toString() +
                  '-' +
                  data.next_payment.getFullYear().toString()}
              </Text>
              <DatePicker
                modal
                mode="date"
                open={next_payment_date}
                date={data.next_payment}
                onConfirm={date => {
                  set_next_payment_date(false);
                  handleChange(date, 'next_payment');
                }}
                onCancel={() => {
                  set_next_payment_date(false);
                }}
              />
            </View>
          </>
        )}
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

  inputtxt: {
    width: windowWidth * 0.7,
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
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
  selectmultiple: {
    width: 200,
    backgroundColor: 'red',
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

export default TypeInfo;
