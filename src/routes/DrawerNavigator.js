import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/Dashboard/HomeScreen";
import DrawerNavContent from "./DrawerNavContent";
import HistoryScreen from "../screens/History/HistoryScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import BinsStatusScreen from "../screens/Bins/BinsStatusScreen";
import LiveTracking from '../screens/liveTracking/LiveTracking';
import FeedbackScreen from "../screens/feedback/FeedbackScreen";
import ComplainScreen from '../screens/Complain/ComplainScreen';
import WasteBin from '../screens/Bins/ViewBins';
import CollectorBinView from '../screens/Bins/CollectorBinView';
import CollectorBinsDetail from '../screens/Bins/CollectorBinsDetail';


const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();
const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="CollectorBin" component={CollectorBinView} />
            <Stack.Screen name="CollectorBinsDetail" component={CollectorBinsDetail} />


            <Stack.Screen name="ViewBin" component={WasteBin} />

            <Stack.Screen name="ComplainScreen"
            
            options={{
                headerShown: true,
                title:'Complain Screen'
            }}
            component={ComplainScreen} />

            <Stack.Screen name="BinsStatusScreen" component={BinsStatusScreen} />
            <Stack.Screen name="FeedbackScreen" options={{
                headerShown: true,
                title:'Feedback Screen'
            }} component={FeedbackScreen} />
            <Stack.Screen name="LiveTracking" component={LiveTracking} />

        </Stack.Navigator>
    );
};
export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="HomeScreen"
            drawerContent={props => {
                return <DrawerNavContent {...props} />;
            }}>
            <Drawer.Screen name="Drawer">
                {props => <MainStackNavigator {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}