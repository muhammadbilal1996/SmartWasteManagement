import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import MapView, {Marker} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoBinAssigned from '../../components/NoBinAssigned';
import { Colors } from '../../utills/Colors';

const CollectorBinView = ({navigation}) => {
  const [binsData, setBinsData] = useState([]);
  const [loading,setLoading] =useState(false)

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true)

      const currentUser = auth().currentUser;
      if (currentUser) {
        const userData = await getUserInfo(currentUser.uid);
        console.log('user Data.', userData.area);
        if (userData?.area) {
          const binsRef = database().ref('bins');
          binsRef.on('value', snapshot => {
            const binData = snapshot.val();
            if (binData) {
              const sectorData = binData[userData?.area];
              if (sectorData) {
                const binsArray = Object.values(sectorData);
                setBinsData(binsArray);
                setLoading(false);
              } else {
                setBinsData([]);
                setLoading(false);

              }
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

  // Rendering each historical event item
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
       // disabled={true}
        onPress={() => navigation.navigate('CollectorBinsDetail',{binsData:item})}
        style={[
          styles.itemContainer,
          {borderColor: item?.binStatus === 'filled' ? 'red' : 'green'},
        ]}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: item?.binLat,
            longitude: item?.binLng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: item?.binLat,
              longitude: item?.binLng,
            }}
            title={item.binName}
          >
             <Image
                  source={
                    item.binStatus ==='filled'
                    ? require('../../assets/images/filled_bin.png')
                    : item?.binStatus === 'partial'
                    ? require('../../assets/images/partial_bin.png')
                    : require('../../assets/images/empty_bin.png')
                  }
                  style={{width: 24, height: 24}}
                />
          </Marker>
        </MapView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{padding: 12, justifyContent: 'center'}}>
            <Text style={styles.itemName}>{item?.binName}</Text>
            <Text style={styles.itemDetails}>
              Location: {item?.binLocation} {'\n'}
              Status: {item?.binStatus}
            </Text>
          </View>
          {item?.binStatus === 'filled' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                style={{marginRight: -30, marginBottom: 8}}
                name="trash"
                size={48}
                color="#C8C8C8"
              />
              <LottieView
                source={require('../../assets/animation/recycle.json')}
                autoPlay
                loop
                style={{
                  height: 24,
                  width: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
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
          {binsData?.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={binsData}
          renderItem={renderItem}
        />
      ) : (
        <NoBinAssigned />
      )}
        </>
      )}
    
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 12,
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

export default CollectorBinView;
