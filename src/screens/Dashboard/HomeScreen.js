import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../utills/Colors";
import LinearGradient from "react-native-linear-gradient";
import constants from "../../constants";
import messaging from "@react-native-firebase/messaging";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
    useEffect(() => {
        constants.storage.get('deviceId').then(async res => {
            if (res === undefined) {
                const deviceToken = await messaging().getToken();
                console.log('deviceToken', deviceToken);
                await constants.storage.set('deviceId', deviceToken);
            } else {
                sendNotification(res)
            }
        })
    }, []);
    const sendNotification =(id) => {
        const serverKey = 'AAAAIvHspXY:APA91bF2Y-ObywRBdDtn2s4JMrnBRzYZ_fMdC0_oZA13vT_W2otNW8y1alUzeYQIuSkL9zofiMxRxM777VXf0Qd9H8eFcXjsCfAMULFS0Tu0lABB9Z9CnMuu8JfZ5EsP67c_mamxf6nX';
        const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';
        const message = {
            to: id,
            notification: {
                title: 'Title of Your Notification',
                body: 'Body of Your Notification',
            },
        };
        axios.post(fcmEndpoint, message, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${serverKey}`,
            },
        })
            .then(response => {
                console.log('Notification sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending notification:', error);
            });
    }
  const [userLocation, setUserLocation] = useState({
      latitude: 33.684051,
      longitude:  72.981572,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  });
    const binsMarkers = [
        { id: 1, title: 'Bin 1', latitude: 33.684051, longitude: 72.981572 },
        { id: 2, title: 'Bin 2', latitude: 33.70008310458884, longitude: 72.97041416659074 },
        { id: 3, title: 'Bin 3', latitude: 33.69197801360682 , longitude: 73.02320003804257 },
    ];
    const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Get user's live location
      Geolocation.getCurrentPosition((success)=>{
          setUserLocation({
              latitude: success.coords.latitude,
              longitude: success.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          })
          setMarkers([...binsMarkers,{ id: binsMarkers.length + 1, title: 'User Location', latitude: success.coords.latitude , longitude: success.coords.longitude } ])
      },
          (e)=>{console.log(e)},
          {timeout: 20000});
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
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.title}
                        pinColor={marker.title !== 'User Location' ? "#0097C9" : 'red'}
                    >
                    </Marker>
                ))}
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
