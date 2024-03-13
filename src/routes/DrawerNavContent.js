import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../utills/Colors';
import constants from '../constants';
import {useDrawerStatus} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';

import database from "@react-native-firebase/database";
import auth from '@react-native-firebase/auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DrawerNavContent = props => {
  const [isActive, setIsActive] = useState('HomeScreen');
  const isOpen = useDrawerStatus();
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userSnapshot = await database()
            .ref('users/' + user.uid)
            .once('value');
          const userData = userSnapshot.val();
          setUserDetails(userData);
        } else {
          console.log('No user is currently logged in.');
        }
      } catch (error) {
        console.error('Error fetching user details: ', error);
      }
    };

    fetchUserDetails();
  }, [isOpen]);
  const handleNavigation = route => {
    setIsActive(route);
    props.navigation.navigate(route);
  };
  const capitalizeWords = str => {
    if (!str) {
      return;
    }
    let words = str.split('_');
    let capitalizedWords = words.map(
      word => word.charAt(0).toUpperCase() + word.slice(1),
    );
    return capitalizedWords.join(' ');
  };
  return (
   
    <View>
       <LinearGradient
    colors={[Colors.primary, Colors.primary_Light]}
    style={styles.mainContainer}>
 

      <View style={styles.drawerIconSection}>
        <Image
          style={styles.stretch}
          borderRadius={50}
          source={userDetails?.image 
            ? { uri: userDetails.image } 
            : require('../assets/images/avatar.png')}
        />
        <Text
          style={{
            fontSize: 16,
            color: '#ffffff',
            marginTop: 10,
            fontFamily: 'Inter-SemiBold',
          }}>
          {userDetails?.userName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontFamily: 'Inter-Medium',
          }}>
          {userDetails?.userEmail}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'white',
            fontFamily: 'Inter-SemiBold',
          }}>
          {`User Role: ${capitalizeWords(userDetails?.userType)}`}
        </Text>
      </View>
      <View style={styles.drawerSectionContainer}>
        <TouchableOpacity
          onPress={() => handleNavigation('HomeScreen')}
          activeOpacity={0.8}
          style={
            isActive === 'HomeScreen'
              ? [
                  styles.screenContainer,
                  {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                ]
              : styles.screenContainer
          }>
          <Icon style={{marginLeft: 8}} name="home" size={24} color="#C8C8C8" />
          <Text style={styles.screenTitle}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation('ProfileScreen')}
          activeOpacity={0.8}
          style={
            isActive === 'ProfileScreen'
              ? [
                  styles.screenContainer,
                  {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                ]
              : styles.screenContainer
          }>
          <Icon
            style={{marginLeft: 8}}
            name="user-circle"
            size={24}
            color="#C8C8C8"
          />
          <Text style={styles.screenTitle}>ProfileScreen</Text>
        </TouchableOpacity>
        {userDetails?.userType === 'collector' && (
          <TouchableOpacity
            onPress={() => handleNavigation('HistoryScreen')}
            activeOpacity={0.8}
            style={
              isActive === 'HistoryScreen'
                ? [
                    styles.screenContainer,
                    {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                  ]
                : styles.screenContainer
            }>
            <Icon
              style={{marginLeft: 8}}
              name="history"
              size={24}
              color="#C8C8C8"
            />
            <Text style={styles.screenTitle}>History Screen</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => handleNavigation(userDetails?.userType !== 'collector' ? 'BinsStatusScreen':'CollectorBin')}
          activeOpacity={0.8}
          style={
            isActive === 'BinsStatusScreen'
              ? [
                  styles.screenContainer,
                  {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                ]
              : styles.screenContainer
          }>
          <Icon
            style={{marginLeft: 8}}
            name="trash"
            size={24}
            color="#C8C8C8"
          />
          <Text style={styles.screenTitle}>Bins Status</Text>
        </TouchableOpacity>
       
          <TouchableOpacity
            onPress={() => handleNavigation('ComplainScreen')}
            activeOpacity={0.8}
            style={
              isActive === 'ComplainScreen'
                ? [
                    styles.screenContainer,
                    {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                  ]
                : styles.screenContainer
            }>
            <Icon
              style={{marginLeft: 8}}
              name="exclamation-triangle"
              size={24}
              color="#C8C8C8"
            />
            <Text style={styles.screenTitle}>Report an Issue</Text>
          </TouchableOpacity>
        
        {userDetails?.userType !== 'collector' && (
            <TouchableOpacity
                onPress={() => handleNavigation('FeedbackScreen')}
                activeOpacity={0.8}
                style={
                  isActive === 'FeedbackScreen'
                      ? [
                        styles.screenContainer,
                        {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                      ]
                      : styles.screenContainer
                }>
              <Icon
                  style={{marginLeft: 8}}
                  name="exclamation-triangle"
                  size={24}
                  color="#C8C8C8"
              />
              <Text style={styles.screenTitle}>Feedback</Text>
            </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            constants.storage.remove('userDetails');
            props.navigation.replace('SignInScreen');
          }}
          activeOpacity={0.8}
          style={styles.logoutContainer}>
          <Icon
            style={{marginLeft: 8}}
            name="sign-out"
            size={24}
            color="#C8C8C8"
          />
          <Text style={[styles.screenTitle, {color: 'white', fontSize: 16}]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: undefined,
    height: (windowHeight / 100) * 100,
    backgroundColor: Colors.primary,
  },
  stretch: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  drawerIconSection: {
    paddingTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  drawerSectionContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column',
    marginRight: 15,
  },
  screenContainer: {
    height: (windowHeight / 100) * 6,
    width: (windowWidth / 100) * 65,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    margin: 2,
  },
  screenTitle: {
    fontSize: 14,
    color:'#ffffff',
    fontFamily: 'DMSans-Medium',
    paddingBottom: 2,
    marginLeft: 12,
  },
  ButtonIconConatiner: {
    padding: 15,
    marginLeft: 10,
  },
  logoutContainer: {
    position: 'absolute',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    bottom: 12,
    height: (windowHeight / 100) * 6,
    width: (windowWidth / 100) * 65,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    backgroundColor: 'red',
  },
});

export default DrawerNavContent;
