import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import BinComponent from './component/BinComponent';
import WasteBin from './ViewBins';
import Header from '../../components/Header';
import NoBinAssigned from '../../components/NoBinAssigned';
import { Colors } from '../../utills/Colors';

const BinsStatusScreen = ({navigation}) => {
  const [binsData, setBinsData] = useState();
  const [loading,setLoading] =useState(false)

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
  
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userData = await getUserInfo(currentUser.uid);
        console.log('user Data.', userData);
        if (userData?.userLat && userData?.userLng) {
          const binsRef = database().ref('bins');
          binsRef.on('value', snapshot => {
            const binData = snapshot.val();
            if (binData) {
              const binsArray = Object.values(binData)
                .flatMap(sector => Object.values(sector))
                .filter(bin => {
                  return (
                    bin.binLat == userData.userLat&&
                    bin.binLng ==userData.userLng
                  );
                });
              if (binsArray.length > 0) {
                setBinsData(binsArray);
              } else {
                setBinsData([]);
              }
              setLoading(false);
            } else {
              setBinsData([]);
              setLoading(false);
            }
          });
        }
      } else {
        console.log('No user is currently logged in.');
      }
    };
  
    fetchUserInfo();
  }, []);
  

  const getUserInfo = async userId => {
    try {
      const userSnapshot = await database()
        .ref('users/' + userId)
        .once('value');

      return userSnapshot.val();
    } catch (error) {
      console.error('Error fetching user details: ', error);
      return null;
    }
  };


  return (
    <View style={styles.mainContainer}>
      <Header title={'Bins Status'} />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={styles.loader}
          />
        </View>
      ) : (
        <>
         {binsData ? 
      <>
      <WasteBin percentage={binsData[0].binPercentage} />
      
        {binsData &&
            <BinComponent
              key={binsData[0].binId}
              binsData={binsData[0]}
              navigation={navigation}
            />}
      </>
      : <NoBinAssigned/>}
        </>)}
     
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  menu: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  map: {
    height: 150,
    width: '100%',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  itemDetails: {
    fontSize: 14,
    color: 'black',
  },
});

export default BinsStatusScreen;
