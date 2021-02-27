import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationHeader from './components/NavigationHeader';

import MainScreen from './screens/MainScreen';
import EntryDetailsScreen from './screens/EntryDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { colors } from './config/Styles';

const Stack = createStackNavigator();
const ROBOTO = require('native-base/Fonts/Roboto.ttf');
const ROBOTO_MEDIUM = require('native-base/Fonts/Roboto_medium.ttf');

const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: colors.main,
	},
};

export default function App() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function loadFonts() {
			await Font.loadAsync({
				Roboto: ROBOTO,
				Roboto_medium: ROBOTO_MEDIUM,
				...Ionicons.font,
			});
			setIsReady(true);
		}

		loadFonts();
	}, []);

	if (!isReady) return <AppLoading />;
	return (
		<SafeAreaProvider>
			<PaperProvider theme={theme}>
				<StatusBar barStyle='light-content' translucent backgroundColor='transparent' />

				<NavigationContainer>
					<Stack.Navigator initialRouteName='Home' screenOptions={{ header: (props) => <NavigationHeader {...props} /> }}>
						<Stack.Screen name='Home' component={MainScreen} screenOptions={{ title: 'Home' }} />
						<Stack.Screen name='Details' component={EntryDetailsScreen} screenOptions={{ title: 'Details' }} />
						<Stack.Screen name='Settings' component={SettingsScreen} screenOptions={{ title: 'Settings' }} />
					</Stack.Navigator>
				</NavigationContainer>

				{/* <Button title="AD BANNER" /> */}
			</PaperProvider>
		</SafeAreaProvider>
	);
}
