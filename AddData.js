import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
} from 'react-native';

// firestore
import firestore from '@react-native-firebase/firestore';

class AddData extends Component {
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
    const allData = users.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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

  DeleteData = (id) => {
    firestore()
      .collection('Users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Nama: </Text>
        <TextInput
          placeholder="masukkan nama"
          style={styles.textInput}
          onChangeText={(v) => this.onChangeText('nama', v)}
          value={this.state.nama}
          namaState="nama"
        />

        <Text>NIM: </Text>
        <TextInput
          placeholder="masukkan nim"
          style={styles.textInput}
          onChangeText={(v) => this.onChangeText('nim', v)}
          value={this.state.nim}
          namaState="nim"
        />

        <Text>Prodi: </Text>
        <TextInput
          placeholder="masukkan prodi"
          style={styles.textInput}
          onChangeText={(v) => this.onChangeText('prodi', v)}
          value={this.state.prodi}
          namaState="prodi"
        />

        <TouchableOpacity style={styles.tambah} onPress={() => this.AddData()}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Input Data</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.prodi}</Text>

              <TouchableOpacity
                style={styles.tambah}
                onPress={() =>
                  this.props.navigation.navigate('UpdatePage', {
                    id: item.id,
                    name: item.name,
                    nim: item.nim,
                    prodi: item.prodi,
                  })
                }>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Edit Data
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tambah}
                onPress={() => this.DeleteData(item.id)}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Delete Data
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
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

export default AddData;
