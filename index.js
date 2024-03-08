import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import App from './App';

import messaging from '@react-native-firebase/messaging';
messaging().requestPermission();
messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    if(Platform.OS === 'ios') {
        PushNotification.localNotification({
            channelId: 'fcm_fallback_notification_channel',
            title: remoteMessage?.notification?.title,
            message: remoteMessage?.notification?.body,
            repeatType: 'day',
            repeatTime: 2,
        });
    } else{
        PushNotification.localNotification({
            channelId: 'fcm_fallback_notification_channel',
            title: remoteMessage?.notification?.title,
            message: remoteMessage?.notification?.body,
        });
    }
});
PushNotification.createChannel(
    {
        channelId: 'fcm_fallback_notification_channel', // Use 'default' for the default channel
        channelName: 'Default Channel',
        channelDescription: 'Default notification channel',
    },
    () => {},
);
AppRegistry.registerComponent(appName, () => App);






