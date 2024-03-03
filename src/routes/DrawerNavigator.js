import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/Dashboard/HomeScreen";
import DrawerNavContent from "./DrawerNavContent";


const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();
const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
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