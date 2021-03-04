import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { colors } from './config/Styles';
import { Navigator } from './config/Routes';
import StoreProvider from './state/Store';

const persistor = getPersistor();
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
		<StoreProvider>
			<PersistGate persistor={persistor}>
				<SafeAreaProvider>
					<PaperProvider theme={theme}>
						<StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
						<Navigator />
						{/* <Button title="AD BANNER" /> */}
					</PaperProvider>
				</SafeAreaProvider>
			</PersistGate>
		</StoreProvider>
	);
}
