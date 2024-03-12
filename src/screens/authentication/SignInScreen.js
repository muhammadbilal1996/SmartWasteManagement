import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, TextInput} from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
//import AsyncStorage from '@react-native-community/async-storage';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import {Colors} from '../../utills/Colors';
import constants from '../../constants';

const SignInScreen = ({navigation}) => {
  const [state, setState] = useState({
    email: '',
    emailError: false,
    password: '',
    isLoading: false,
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const ValidateEmail = mail => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(mail);
  };

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setState({
        ...state,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setState({
        ...state,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 4) {
      setState({
        ...state,
        password: val,
        isValidPassword: true,
      });
    } else {
      setState({
        ...state,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setState({
      ...state,
      secureTextEntry: !state.secureTextEntry,
    });
  };

  const loginHandle = () => {
    if (state.email === '' || state.password === '') {
      Snackbar.show({
        text: 'Username or password field cannot be empty.',
        duration: parseInt(2000),
        action: {
          text: '',
          textColor: Colors.primary,
          onPress: () => {},
        },
      });
    } else if (!ValidateEmail(state.email)) {
      setState({...state, emailError: true});
    } else {
      setState({
        ...state,
        isLoading: true,
        emailError: false,
      });

      auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then(res => {
          console.log('res...............', JSON.stringify(res));
          database()
            .ref(`/users/${res.user.uid}`)
            .on('value', snapshot => {
              constants.storage.set('userDetails', snapshot);
            });
          Snackbar.show({
            text: 'User logged-in successfully!',
            duration: parseInt(2000),
            action: {
              text: '',
              textColor: Colors.primary,
              onPress: () => {},
            },
          });
          setState({
            ...state,
            isLoading: false,
            email: '',
            password: '',
            check_textInputChange: false,
            secureTextEntry: true,
            isValidUser: true,
            isValidPassword: true,
          });
          navigation.replace('MyDrawer');
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            setState({...state, isLoading: false});
            Snackbar.show({
              text: 'This password is wrong.',
              duration: parseInt(5000),
              action: {
                text: '',
                textColor: Colors.primary,
                onPress: () => {},
              },
            });
          } else if (error.code === 'auth/user-not-found') {
            Snackbar.show({
              text: 'This email is not yet registered ',
              duration: parseInt(5000),
              action: {
                text: '',
                textColor: Colors.primary,
                onPress: () => {},
              },
            });
            setState({
              ...state,
              isLoading: false,
            });
          } else if (error.code === 'auth/network-request-failed') {
            Snackbar.show({
              text: 'Make sure you have internet connection ',
              duration: Snackbar.LENGTH_INDEFINITE,
              action: {
                text: 'Ok',
                textColor: Colors.primary,
                onPress: () => {},
              },
            });
            setState({
              ...state,
              isLoading: false,
            });
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <View style={styles.footer} animation="fadeInUpBig">
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
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Not Valid Email</Text>
          </View>
        )}
        <Text style={[styles.text_footer, {marginTop: 30}]}>Password</Text>
        <View style={styles.action}>
          <FontAwesomeIcon name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={state.secureTextEntry ? true : false}
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
        {!state.isValidPassword ? (
          <View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 6 characters long
            </Text>
          </View>
        ) : null}

        {state.isLoading ? (
          <View style={{marginTop: 100}}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <View style={styles.button}>
            <TouchableOpacity
              onPress={loginHandle}
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
                <Text style={[styles.textSign, {color: '#fff'}]}>SignIn</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
              style={[
                styles.signIn,
                {borderColor: Colors.primary, borderWidth: 1, marginTop: 15},
              ]}>
              <Text style={[styles.textSign, {color: Colors.primary_dark}]}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginVertical: 15,
    paddingBottom: 14,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
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
});
