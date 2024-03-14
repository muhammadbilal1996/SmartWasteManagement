import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
  Text,
  Image, Linking,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Colors} from '../../utills/Colors';

const HomeScreen = () => {
  const navigation = useNavigation();
  //const [userLocation, setUserLocation] = useState(null); // Initialize userLocation as null
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [markers, setMarkers] = useState([]);

  const [nearestFilledBin, setNearestFilledBin] = useState(null); // State to store the nearest filled bin
  const [polylineCoordinates, setPolylineCoordinates] = useState([]); // State to store the polyline coordinates

  const [userLocation, setUserLocation] = useState({
    latitude: 33.684051,
    longitude: 72.981572,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLoading(false);
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    // Check if user is authenticated
    const user = auth().currentUser; // Use auth module to get the current user
    if (user) {
      // Retrieve bin data for the current user from database
      const binsRef = database()
        .ref('bins')
        .orderByChild('binCollector')
        .equalTo(user.uid); // Remove .database() from database()
      binsRef.on('value', snapshot => {
        const binData = snapshot.val();
        if (binData) {
          // Convert bin data to markers format
          const newMarkers = Object.values(binData).map(bin => ({
            id: bin.binId,
            title: bin.binName || 'Bin',
            latitude: bin.binLat,
            longitude: bin.binLng,
            status: bin.binStatus,
          }));
          // Update markers state
          console.log({newMarkers});
          setMarkers(newMarkers);
        }
      });
    }
  }, []);

  useEffect(() => {
    // Calculate distances and find the nearest filled bin
    if (userLocation && markers.length > 0) {
      let nearestDistance = Number.MAX_VALUE;
      let nearestBin = null;

      markers.forEach(marker => {
        if (marker.status === 'filled') {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            marker.latitude,
            marker.longitude,
          );
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestBin = marker;
          }
        }
      });

      // Set the nearest filled bin
      setNearestFilledBin(nearestBin);
    }
  }, [userLocation, markers]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    if (nearestFilledBin) {
      // Draw a polyline from the nearest filled bin to other filled bins
      const polylineCoordinates = [];

      // Add user's location coordinates
      polylineCoordinates.push({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });

      // Add the nearest filled bin's coordinates
      polylineCoordinates.push({
        latitude: nearestFilledBin.latitude,
        longitude: nearestFilledBin.longitude,
      });

      // Add other filled bins' coordinates
      markers.forEach(marker => {
        if (marker.status === 'filled' && marker !== nearestFilledBin) {
          polylineCoordinates.push({
            latitude: marker.latitude,
            longitude: marker.longitude,
          });
        }
      });

      setPolylineCoordinates(polylineCoordinates);
    }
  }, [userLocation, nearestFilledBin, markers]);

  const handleCollectNow = () => {
    // Navigate to the next screen with the shortest polyline coordinates
    // Implement your navigation logic here
    // console.log('Navigate to the next screen');
    // console.log('Shortest Polyline Coordinates:', polylineCoordinates);
    // navigation.navigate('LiveTracking', {
    //   polylineCoordinates: polylineCoordinates,
    // });
    const latitude = nearestFilledBin?.latitude;
    const longitude = nearestFilledBin?.longitude;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.menu}
        onPress={() => navigation.openDrawer()}>
        <Icon name="bars" size={20} color="#000" />
      </TouchableOpacity>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={styles.loader}
          />
        </View>
      ) : (
        userLocation && (
          <MapView style={styles.map} initialRegion={userLocation}>
            {/* Place a marker for user's location */}
            {userLocation && (
              <Marker
                coordinate={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }}
                title="Your Location">
                <Image
                  source={
                    userDetails?.userType === 'collector'
                      ? require('../../assets/images/truck.png')
                      : require('../../assets/images/user.png')
                  }
                  style={{width: 24, height: 24}}
                />
              </Marker>
            )}

            {/* Draw a polyline from the nearest filled bin to other filled bins */}
            {polylineCoordinates.length > 0 && (
              <Polyline
                coordinates={polylineCoordinates}
                strokeWidth={2}
                strokeColor="red"
              />
            )}

            {/* Place markers for other locations */}
            {markers.map(marker => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}>
                <Image
                  source={
                    marker.status === 'filled'
                      ? require('../../assets/images/filled_bin.png')
                      : require('../../assets/images/empty_bin.png')
                  }
                  style={{width: 24, height: 24}}
                />
              </Marker>
            ))}
          </MapView>
        )
      )}

      {/* Render "Collect Now" button if nearest filled bin is selected */}
      {nearestFilledBin && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: '40%',
            bottom: 20,
            alignSelf: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: Colors.primary_dark,
            borderRadius: 5,
          }}
          onPress={handleCollectNow}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Collect Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
  bottomSheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: (windowHeight / 100) * 20,
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
  signIn: {
    width: (windowWidth / 100) * 44,
    marginHorizontal: 4,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 16,
  },
});

export default HomeScreen;
