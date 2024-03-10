import React from 'react';
import SplashScreen from "../screens/splash/SplashScreen";
import SignUpScreen from "../screens/authentication/SignUpScreen";
import SignInScreen from "../screens/authentication/SignInScreen";
import DrawerNavigator from "./DrawerNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LiveTracking from '../screens/liveTracking/LiveTracking';

const RootStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen  name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="MyDrawer" component={DrawerNavigator} />
            <Stack.Screen name="LiveTracking" component={LiveTracking} />

        </Stack.Navigator>
    );
};
export default RootStack;