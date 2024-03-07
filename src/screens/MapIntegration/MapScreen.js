
// Import Map and Marker
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
} from 'react-native';

//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';

import MapView, {Marker} from 'react-native-maps';

const MapScreen = () => {
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');
 

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location.',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('You are Here');
        setCurrentLongitude(position.coords.longitude);
        setCurrentLatitude(position.coords.latitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('You are Here');
        setCurrentLongitude(position.coords.longitude);
        setCurrentLatitude(position.coords.latitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
  };

  if (!currentLongitude || !currentLatitude) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentLatitude,
              longitude: currentLongitude,
            }}
            title={'You are Here'}
            description={'This is your current location'}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};
export default MapScreen;
const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});