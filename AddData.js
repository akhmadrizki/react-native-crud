import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  Button,
  Image,
  ScrollView,
} from 'react-native';

// firestore
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

class AddData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      nim: '',
      prodi: '',
      filePath: '',
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

  // ini fungsi untuk menampilkan imagepicker (camera)
  chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      this.setState({filePath: response});
    });
  };

  AddData = () => {
    firestore()
      .collection('Users')
      .add({
        name: this.state.nama,
        nim: this.state.nim,
        prodi: this.state.prodi,
        image: this.state.filePath.uri,
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
      <ScrollView style={{flex: 1}}>
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

        <Image
          source={{uri: this.state.filePath.uri}}
          style={{width: 80, height: 60}}
        />
        <Text style={styles.textStyle}>{this.state.filePath.uri}</Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => this.chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tambah} onPress={() => this.AddData()}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Input Data</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.prodi}</Text>
              <Image
                source={{uri: item.image}}
                style={{width: 40, height: 40}}
              />

              <TouchableOpacity
                style={styles.tambah}
                onPress={() =>
                  this.props.navigation.navigate('UpdatePage', {
                    id: item.id,
                    name: item.name,
                    nim: item.nim,
                    prodi: item.prodi,
                    image: item.image,
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
      </ScrollView>
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
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: '100%',
  },
});

export default AddData;
