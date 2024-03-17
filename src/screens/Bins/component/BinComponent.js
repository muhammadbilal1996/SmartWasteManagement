import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';

const BinComponent = ({binsData, navigation}) => {
  return (
    <TouchableOpacity
      disabled={true}
      onPress={() => navigation.navigate('ViewBin')}
      style={[
        styles.itemContainer,
        {borderColor: binsData?.binStatus === 'filled' ? 'red' :binsData?.binStatus === 'partial' ? 'yellow' : 'green'},
      ]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: binsData?.binLat,
          longitude: binsData?.binLng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: binsData?.binLat,
            longitude: binsData?.binLng,
          }}
          title={binsData?.binName}>
          <Image
            source={
              binsData?.binStatus === 'filled'
                ? require('../../../assets/images/filled_bin.png')
                : binsData?.binStatus === 'partial'
                ? require('../../../assets/images/partial_bin.png')
                : require('../../../assets/images/empty_bin.png')
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
          <Text style={styles.itemDetails}>
            Location: {binsData?.binLocation} {'\n'}
            Status: {binsData?.binStatus}
          </Text>
        </View>

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
            source={require('../../../assets/animation/recycle.json')}
            autoPlay
            loop
            style={{
              height: 24,
              width: 24,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 25,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BinComponent;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginBottom: 12,
    overflow: 'hidden',
  },
  map: {
    height: 250,
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
