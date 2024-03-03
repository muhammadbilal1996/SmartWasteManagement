import React, { useState } from 'react';
import {ActivityIndicator,View, Text, StyleSheet, Alert, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
//import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import { Colors } from '../utills/Colors';
const SignUpScreen = ({ navigation }) => {
    const [state, setState] = useState({
      displayName: '',
      email: '',
      password: '',
      userType:'collector',
      isLoading: false,
      validate_displayName:false,
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
      emailError: false,
    });
  
    const ValidateEmail = mail => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
    };
  
    const textInputChange = val => {
      if (val.trim().length >= 4) {
        setState(prevState => ({
          ...prevState,
          email: val,
          check_textInputChange: true,
          isValidUser: true,
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          email: val,
          check_textInputChange: false,
          isValidUser: false,
        }));
      }
    };
  
    const handlePasswordChange = val => {
      if (val.trim().length >= 4) {
        setState(prevState => ({
          ...prevState,
          password: val,
          isValidPassword: true,
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          password: val,
          isValidPassword: false,
        }));
      }
    };
  
    const updateSecureTextEntry = () => {
      setState(prevState => ({
        ...prevState,
        secureTextEntry: !prevState.secureTextEntry,
      }));
    };
  
    const signUpHandle = async () => {
      if (state.email === '' || state.password === '' || state.displayName==='') {
        Alert.alert('Fields cannot be empty!');
      } else if (!ValidateEmail(state.email)) {
        setState(prevState => ({ ...prevState, emailError: true }));
      } else {
        setState(prevState => ({
          ...prevState,
          isLoading: true,
          emailError: false,
        }));
        auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then(res => {
          database()
            .ref('users/' + res.user.uid)
            .set({
              userName: state.displayName,
              userEmail: res.user.email,
              userPassword: state.password,
              userType: state.userType,
              uId: res.user.uid,
            })
            .then(() => {
              Snackbar.show({
                text: 'User registered successfully!',
                duration: parseInt(2000),
                action: {
                  text: '',
                  textColor: Colors.primary,
                  onPress: () => {},
                },
              });
      
            setState({
              displayName: '',
              email: '',
              password: '',
              userType:'collector',
              isLoading: false,
              check_textInputChange: false,
              secureTextEntry: true,
              isValidUser: true,
              isValidPassword: true,
            });
           // navigation.navigate('SignInScreen');
          })
        }).catch(error => {
          if (error.code === 'auth/weak-password') {
            Snackbar.show({
              text: 'The password is too weak.',
              duration: parseInt(5000),
              action: {
                text: '',
                textColor: Colors.primary,
                onPress: () => {},
              },
            });
          } else if (error.code === 'auth/email-already-in-use') {
            Snackbar.show({
              text: 'This email already in use',
              duration: parseInt(5000),
              action: {
                text: '',
                textColor: Colors.primary,
                onPress: () => {},
              },
            });
          } else if (error.code === 'auth/network-request-failed') {
            Snackbar.show({
              text: 'Make sure you have internet connection',
              duration: Snackbar.LENGTH_INDEFINITE,
              action: {
                text: 'Ok',
                textColor: Colors.primary,
                onPress: () => {},
              },
            });
          }
          setState(prevState => ({ ...prevState, isLoading: false }));
        })
      }

    }

    if (state.isLoading) {
        return (
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        );
      }
    
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
          </View>
          <View style={styles.footer}>
          <Text style={styles.text_footer}>Name</Text> 
        <View style={styles.action}>
          <FontAwesomeIcon name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Name"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setState({ ...state, displayName: val })}
          />
        </View>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              <FontAwesomeIcon name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={textInputChange}
              />
            </View>
            {!state.emailError ? null : (
              <View>
                <Text style={styles.errorMsg}>Not Valid Email</Text>
              </View>
            )}
            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
              <FontAwesomeIcon name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Password"
                secureTextEntry={state.secureTextEntry}
                style={styles.textInput}
                onChangeText={handlePasswordChange}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {state.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {state.isValidPassword ? null : (
              <View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password must be 6 characters long</Text>
              </View>
            )}

<Text style={styles.text_footer}>Select User Type</Text>

          <Picker
            selectedValue={state.userType}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setState({ ...state, userType: itemValue })
            }>
            <Picker.Item label="Waste Collector" value="collector" />
            <Picker.Item label="Community Person" value="community_person" />
          </Picker>
      

            <View style={styles.button}>
              <TouchableOpacity
                onPress={signUpHandle}
                colors={[Colors.primary, Colors.primary_dark]}
                style={styles.signIn}>
                <LinearGradient
                  colors={[Colors.primary, Colors.primary_dark]}
                  style={styles.signIn}>
                  <Text style={[styles.textSign, { color: '#fff' }]}>SignUp</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignInScreen')}
                style={[
                  styles.signIn,
                  { borderColor: Colors.primary, borderWidth: 1, marginTop: 15 },
                ]}>
                <Text style={[styles.textSign, { color: Colors.primary }]}>SignIn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
}

export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 0.3,
    paddingHorizontal: 15,
    marginTop:20,
  },
  footer: {
    flex:3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop:'10%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    marginTop:10
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
