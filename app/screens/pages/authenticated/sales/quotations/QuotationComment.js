import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import QuotationService from '../../../../../services/QuotationService';

const QuotationComment = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState();
  const [comment, setComment] = useState('');

  const getQuotationComment = async () => {
    let res = await QuotationService.getComment(route.params.id);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    getQuotationComment();
  }, []);

  const sendComment = async () => {
    if (comment) {
      await QuotationService.sendComment({
        quotation_id: route.params.id,
        text: comment,
      });
      getQuotationComment();
      setComment('');
    } else {
      Toast.show({
        type: 'info',
        text1: 'Empty Comment',
        text2: 'Empty Comment',
        position: 'top',
      });
    }
  };

  const commentList = item => {
    return (
      <View style={styles.commentContainer}>
        <Image
          style={styles.image}
          source={{
            uri: item?.item?.user?.avatar_url,
          }}
        />
        <View style={{marginLeft: 10}}>
          <View>
            <Text style={{fontSize: 16, color: '#000'}}>
              {item?.item?.text}
            </Text>
          </View>
          <Text>{item?.item?.user?.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 12}}>
              {moment(item?.item?.updated_at).format('YYYY-MM-DD')}
            </Text>
            <Text style={{marginLeft: 20, color: 'tomato', fontSize: 12}}>
              {item?.item?.type}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{padding: 10, marginHorizontal: 5, flexDirection: 'row'}}
        onPress={() => {
          navigation.navigate('QuotationDetails', {id: route.params.id});
        }}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{marginHorizontal: 5, fontSize: 18}}>
          Quotation Comment
        </Text>
      </TouchableOpacity>

      {data?.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={commentList}
          keyExtractor={item => item?.id}
        />
      ) : (
        <View style={{alignItems: 'center'}}>
          <Text>No comment found</Text>
        </View>
      )}

      <View style={{flexDirection: 'row'}}>
        <TextInput
          onChangeText={setComment}
          style={styles.commentbox}
          value={comment}
          placeholder="Comment"
        />
        <TouchableOpacity style={{padding: 10}} onPress={sendComment}>
          <FontAwesome name="send" size={24} color="#000" />
        </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  comment: {
    padding: 10,
    backgroundColor: '#fff',
    margin: 10,
  },

  commentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
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

  //   card: {
  //     margin: 10,
  //     padding: 20,
  //     backgroundColor: '#fff',
  //     borderRadius: 10,
  //     flexDirection: 'row',

  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 3,
  //     },
  //     shadowOpacity: 0.29,
  //     shadowRadius: 4.65,

  //     elevation: 7,
  //   },
  //   cardtitle: {
  //     paddingRight: 20,
  //     backgroundColor: '#fff',
  //     borderRadius: 10,
  //   },
  //   carddetails: {
  //     paddingLeft: 20,
  //   },
  //   btn: {
  //     alignSelf: 'center',
  //     borderRadius: 10,
  //     marginTop: 10,
  //     padding: 5,
  //     borderWidth: 1,
  //     backgroundColor: '#007BFF',
  //     borderColor: '#007BFF',
  //   },
  //   btntxt: {
  //     color: '#fff',
  //     fontWeight: 'bold',
  //   },

  //   machineCard: {
  //     margin: 10,
  //     padding: 20,
  //     backgroundColor: '#fff',
  //     borderRadius: 10,
  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 3,
  //     },
  //     shadowOpacity: 0.29,
  //     shadowRadius: 4.65,

  //     elevation: 7,
  //   },

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

export default QuotationComment;
