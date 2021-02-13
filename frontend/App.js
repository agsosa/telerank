import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomNavigationBar from './src/components/CustomNavigationBar'

import HomeScreen from './src/screens/HomeScreen';
import EntryDetailsScreen from './src/screens/EntryDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setIsReady(true);
    }

    loadFonts();
  }, []);

  if (!isReady) return ( <AppLoading /> );
  else return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{header: (props) => <CustomNavigationBar {...props} />}}>
            <Stack.Screen name="Home" component={HomeScreen} screenOptions={{ title: 'Home' }} />
            <Stack.Screen name="Details" component={EntryDetailsScreen} screenOptions={{ title: 'Details' }} />
            <Stack.Screen name ="Settings" component={SettingsScreen} screenOptions={{ title: 'Settings' }} />
          </Stack.Navigator>
        </NavigationContainer>

        <Button title="AD BANNER" style={{height:500}}/>

      </PaperProvider>
    </SafeAreaProvider>
  );
}
