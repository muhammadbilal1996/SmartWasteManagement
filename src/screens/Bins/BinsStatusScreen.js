import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../../components/Header';
import database from '@react-native-firebase/database';
import MapView, {Marker} from 'react-native-maps';

const BinsStatusScreen = () => {
  const [binsData, setBinsData] = useState([]);
  useEffect(() => {
    database()
      .ref('/bins')
      .on('value', snapshot => {
        setBinsData(Object.values(snapshot.val()));
      });
  }, []);

  // Rendering each historical event item
  const renderItem = ({item}) => (
    <View
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
      <View style={{padding: 12, justifyContent: 'center'}}>
        <Text style={styles.itemName}>{item?.binName}</Text>
        <Text style={styles.itemDetails}>
          Location: {item?.binLocation} {'\n'}
          Status: {item?.binStatus}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Header title={'Bins Status'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={binsData}
        renderItem={renderItem}
      />
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
  },
});

export default BinsStatusScreen;
