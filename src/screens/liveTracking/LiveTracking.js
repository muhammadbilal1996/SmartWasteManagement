import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'; // Import geolocation

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

const LiveTracking = () => {
  const [latitude, setLatitude] = useState(LATITUDE);
  const [longitude, setLongitude] = useState(LONGITUDE);
  const markerRef = useRef(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [prevLatLng, setPrevLatLng] = useState({});
  const coordinate = useRef(new AnimatedRegion({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: 0,
    longitudeDelta: 0,
  }));

  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = { latitude, longitude };

        if (markerRef.current) {
          markerRef.current.animateMarkerToCoordinate(newCoordinate, 500);
        }

        setLatitude(latitude);
        setLongitude(longitude);
        setRouteCoordinates([...routeCoordinates, newCoordinate]);
        setPrevLatLng(newCoordinate);
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, [prevLatLng, routeCoordinates]);

  const getMapRegion = () => ({
    latitude,
    longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showUserLocation
        followUserLocation
        loadingEnabled
        region={getMapRegion()}>
        <Polyline coordinates={routeCoordinates} strokeWidth={5} />
        <Marker.Animated
          ref={marker => {
            markerRef.current = marker;
          }}
          coordinate={coordinate.current}
          image={require('../../assets/images/truck.png')}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default LiveTracking;
