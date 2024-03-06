import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../utills/Colors";
import LinearGradient from "react-native-linear-gradient";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's live location
    // Geolocation.getCurrentPosition(
    //     position => {
    //       console.log(position)
    //       setUserLocation({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //       });
    //     },
    //     error => console.log(error.message),
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //
    // );
    setUserLocation({
      latitude: 33.684051,
      longitude:  72.981572,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }, []);

  return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={() => navigation.openDrawer()} >
          <Icon name="bars" size={20} color="#000" />
        </TouchableOpacity>
        {userLocation && (
            <MapView
                style={styles.map}
                initialRegion={userLocation}
            >
              <Marker
                  coordinate={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                  }}
                  title="You are here"
              />
            </MapView>
        )}
        <View style={styles.bottomSheet}>
          <Text style={{marginTop: 12, color: Colors.primary, fontSize: 18, fontWeight: '700'}}>Waste Management System</Text>
         <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
              onPress={() => navigation.navigate('BinsStatusScreen')}
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
              <Text style={[styles.textSign, { color: '#fff' }]}>View Bins Status</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => navigation.navigate('ReportScreen')}
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
              <Text style={[styles.textSign, { color: '#fff' }]}>View Report</Text>
            </LinearGradient>
          </TouchableOpacity>
         </View>
        </View>
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
    backgroundColor:  'rgba(255, 255, 255, 0.3)',
    padding: 10,
    borderRadius: 20
  },
  bottomSheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: (windowHeight / 100) * 20,
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    backgroundColor:  'white',
    padding: 12
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
