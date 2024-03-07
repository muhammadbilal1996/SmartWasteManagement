// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Dashboard/HomeScreen';
import SignInScreen from './src/screens/authentication/SignInScreen';
import SignUpScreen from './src/screens/authentication/SignUpScreen';
import MapScreen from './src/screens/MapIntegration/MapScreen';
import GetCurrentLocation from './src/screens/MapIntegration/GetCurrentLocation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
      }}>
        <Stack.Screen name="CurrentLocation" component={GetCurrentLocation}/>
        <Stack.Screen name="MapScreen" component={MapScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen  name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;