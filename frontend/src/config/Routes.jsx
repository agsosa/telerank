import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Platform } from 'react-native';
import NavigationHeader from '../components/NavigationHeader';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const DEFAULT_ROUTE = 'Home';

const ROUTES = [
	{
		name: 'Home',
		component: MainScreen,
		title: 'Home',
		extendHeaderGradient: false,
	},
	{
		name: 'Details',
		component: DetailsScreen,
		title: 'Details',
		extendHeaderGradient: true,
	},
	{
		name: 'Settings',
		component: SettingsScreen,
		extendHeaderGradient: false,
		title: 'Settings',
	},
];

export function getRouteInfo(route) {
	return ROUTES.find((q) => q.name === route.name);
}

export function Navigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={DEFAULT_ROUTE} screenOptions={{ header: (props) => <NavigationHeader {...props} routeInfo={getRouteInfo} /> }}>
				{ROUTES.map((q) => (
					<Stack.Screen key={q.name} name={q.name} component={q.component} screenOptions={{ title: q.title }} />
				))}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
