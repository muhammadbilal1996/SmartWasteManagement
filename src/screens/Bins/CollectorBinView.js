import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import Header from '../../components/Header';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import MapView, {Marker} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import NoBinAssigned from '../../components/NoBinAssigned';

const CollectorBinView = ({navigation}) => {
  const [binsData, setBinsData] = useState([]);
  useEffect(() => {
    const user = auth().currentUser;
    const binsRef = database()
      .ref('bins')
      .orderByChild('binCollector')
      .equalTo(user.uid);
  
    if (binsRef) {
      binsRef.on('value', snapshot => {
        console.log("snapshot...",snapshot)
        if (snapshot.exists()) { // Check if the snapshot exists
          const data = snapshot.val();
          const binsArray = [];
          snapshot.forEach(childSnapshot => {
            binsArray.push(childSnapshot.val());
          });
          setBinsData(binsArray);
        } else {
          setBinsData([]); // Set binsData to an empty array if no data is found
        }
      });
    }
  }, []);
  

  // Rendering each historical event item
  const renderItem = ({item}) => (
    <TouchableOpacity
    disabled={true}
    onPress={()=>navigation.navigate('ViewBin')}
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
        />
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
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Icon style={{marginRight: -30, marginBottom: 8}} name="trash" size={48} color="#C8C8C8" />
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

  return (
    <View style={styles.mainContainer}>
      <Header title={'Bins Status'} />
    {binsData?.length ?  <FlatList
        showsVerticalScrollIndicator={false}
        data={binsData}
        renderItem={renderItem}
      />
      :
      <NoBinAssigned/>
    }  
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
      color: 'black'
  },
});

export default CollectorBinView;
