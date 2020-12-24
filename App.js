import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddData from './AddData';
import UpdatePage from './UpdatePage';

// firestore
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      nim: '',
      prodi: '',
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSumbit = () => {
    comsole.log('masuk');
    console.log(this.state);
  };

  componentDidMount() {
    // this.GetData();
    this.GetDataCollection();
  }

  GetData = async () => {
    const user = await firestore()
      .collection('Users')
      .doc('2YInI5eyuc7wuTcwcAfR')
      .get();
    const data = user.data();
    console.log(data);
  };

  GetDataCollection = async () => {
    const users = await firestore().collection('Users').get();
    const allData = users.docs.map((doc) => doc.data());
    this.setState({data: allData});
    console.log(allData);
  };

  AddData = () => {
    firestore()
      .collection('Users')
      .add({
        name: this.state.nama,
        nim: this.state.nim,
        prodi: this.state.prodi,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  UpdateData = () => {
    firestore()
      .collection('Users')
      .doc('je8TZIF24RUrAvgWvzQC')
      .update({
        name: 'yoga',
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Add" component={AddData} />
          <Stack.Screen name="UpdatePage" component={UpdatePage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  tambah: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default App;
