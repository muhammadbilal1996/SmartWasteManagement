import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utills/Colors';
import * as ImagePicker from 'react-native-image-picker';
import IconImage from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';

import Modal from 'react-native-modal';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const [circleImage, setCircleImage] = useState('');

  const [ImageModal, setImageModal] = useState(false);

  const [SeletecImageForSend, setSeletecImageForSend] = useState([]);

  const handleNameChange = text => {
    setName(text);
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await database()
          .ref('users/' + user.uid)
          .update({
            userName: name,
            image: circleImage,
            contact: phoneNumber,
          });
        Snackbar.show({
          text: 'User profile updated successfully!',
          duration: parseInt(2000),
          action: {
            text: '',
            textColor: Colors.primary,
            onPress: () => {},
          },
        });
      } else {
        Snackbar.show({
          text: 'User profile not updated try again!',
          duration: parseInt(2000),
          action: {
            text: '',
            textColor: Colors.primary,
            onPress: () => {},
          },
        });
      }
    } catch (error) {
      Snackbar.show({
        text: 'Error updating user profile: ' + error,
        duration: parseInt(2000),
        action: {
          text: '',
          textColor: Colors.primary,
          onPress: () => {},
        },
      });
    }
  };

  // openGallery function will load image from gallery
  function openGallery() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        setImageModal(false);
      } else if (response.error) {
        setImageModal(false);
      } else if (response.customButton) {
        setImageModal(false);
      } else {
        let file = {
          name: new Date() + '.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? response.assets[0].uri
              : response.assets[0].uri.replace('file://', ''),
        };
        let image = {
          name: new Date() + '.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? response.assets[0].uri
              : response.assets[0].uri.replace('file://', ''),
        };
        setImageModal(false);
        setCircleImage(image.uri);
        setSeletecImageForSend(file);
      }
    });
  }

  const requestCameraPermission = async () => {
    console.log('Camera press..........................');
    try {
      if (Platform.OS == 'ios') {
        openCamera();
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted
          openCamera();
        } else {
          // Permission Denied
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // openCamera function will open user camera and take picture
  function openCamera() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        maxWidth: 100,
        maxHeight: 100,
        quality: 0.5,
      },
    };

    ImagePicker.launchCamera(options, response => {
      console.log({response});
      if (response.didCancel) {
        setImageModal(false);
      } else if (response.error) {
        setImageModal(false);
      } else if (response.customButton) {
        setImageModal(false);
      } else {
        let file = {
          name: new Date() + '.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? response.assets[0].uri
              : response.assets[0].uri.replace('file://', ''),
        };
        let image = {
          name: new Date() + '.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? response.assets[0].uri
              : response.assets[0].uri.replace('file://', ''),
        };
        setImageModal(false);
        setCircleImage(image.uri);
        setSeletecImageForSend(file);
      }
    });
  }

  // this renderUserPictureView function will display user picture and its design
  const renderUserPictureView = () => {
    return (
      <View>
        <View
          style={{
            ...styles.UserImageViews,
          }}>
          <TouchableOpacity
            onPress={() => setImageModal(true)}
            activeOpacity={0.95}
            style={{}}>
            {!circleImage ? (
              <View
                style={{
                  ...styles.ImageUser,
                  marginTop: 8,
                  borderWidth: 3,
                  borderColor: '#ffffff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/avatar.png')}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
              </View>
            ) : (
              <View style={styles.CicrleSelectImage}>
                <Image
                  resizeMode={'contain'}
                  source={{uri: circleImage}}
                  style={styles.ImageUser}
                />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setImageModal(true)}
            style={{
              ...styles.btnViewpro,
            }}>
            <Text style={styles.btnTextpro}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header title={'Profile'} />
      {renderUserPictureView()}
      <View style={styles.profileContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={handleNameChange}
          value={name}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType={'numeric'}
        />

        <TouchableOpacity
          onPress={handleUpdateProfile}
          style={[
            styles.signIn,
            {
              borderColor: Colors.primary_dark,
              borderWidth: 1,
              marginTop: 15,
            },
          ]}>
          <LinearGradient
            colors={[Colors.primary, Colors.primary_dark]}
            style={styles.signIn}>
            <Text style={[styles.textSign, {color: '#fff'}]}>Update</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* picture modal */}

      <Modal
        style={styles.ModalViewPic}
        onBackButtonPress={() => setImageModal(false)}
        onBackdropPress={() => setImageModal(false)}
        visible={ImageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setImageModal(false)}
        hardwareAccelerated>
        <View style={styles.ModalView}>
          <TouchableHighlight
            underlayColor={'#ffffff'}
            onPress={() => requestCameraPermission()}
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}>
            <View style={styles.modalItem}>
              <IconImage name="camera" size={25} style={{color: 'black'}} />
              <Text style={styles.modalItemText}>Camera</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor="#ddd"
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
            onPress={() => openGallery()}>
            <View style={styles.modalItem}>
              <IconImage name="photo" size={25} style={{color: 'black'}} />
              <Text style={styles.modalItemText}>Gallery</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={'#ffffff'}
            style={{
              borderBottomColor: 'transparent',
              borderBottomWidth: 1,
              marginLeft: 4,
            }}
            onPress={() => setImageModal(false)}>
            <View style={styles.modalItem}>
              <IconImage name="close" size={25} style={{color: 'red'}} />
              <Text style={styles.modalItemText}>Cancel</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  btnViewpro: {
    height: 38,
    width: '45%',
    marginVertical: 20,
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 27,
  },
  btnTextpro: {
    color: Colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
    letterSpacing: 0.04,
    fontSize: 12,
  },
  input: {
    height: 48,
    width: '100%',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  updateButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 50,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  //////////////////////////////////////////////////////////

  CicrleSelectImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
    borderWidth: 3,
    borderColor: Colors.white,
    alignItems: 'center',
  },

  Title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
  },

  // profile style

  UserImageViews: {
    marginTop: 5,
    alignItems: 'center',
  },

  ModalViewPic: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ImageUser: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.black,
  },

  modalItemText: {
    marginLeft: 14,
    fontSize: 16,
    paddingLeft: 10,
  },

  modalItem: {
    flexDirection: 'row',
    padding: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },

  ModalView: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },

  //Modal view
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: -20,
    backgroundColor: 'rgba(35,36,65,0.6)',
  },
});

export default ProfileScreen;
