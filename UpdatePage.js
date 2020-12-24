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

class UpdatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      nama: this.props.route.params.name,
      nim: this.props.route.params.nim,
      prodi: this.props.route.params.prodi,
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

  UpdateData = () => {
    firestore()
      .collection('Users')
      .doc(this.state.id)
      .update({
        name: this.state.nama,
        nim: this.state.nim,
        prodi: this.state.prodi,
      })
      .then(() => {
        console.log('User updated!');
        this.props.navigation.navigate('Add');
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

        <TouchableOpacity
          style={styles.tambah}
          onPress={() => this.UpdateData()}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Update Data</Text>
        </TouchableOpacity>
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

export default UpdatePage;
