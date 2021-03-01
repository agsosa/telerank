import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

export function Navigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={DEFAULT_ROUTE} screenOptions={{ header: (props) => <NavigationHeader {...props} /> }}>
				{ROUTES.map((q) => {
					return (
						<Stack.Screen
							key={q.name}
							name={q.name}
							component={q.component}
							screenOptions={(q) => {
								title: {
									q.title;
								}
							}}
						/>
					);
				})}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export function getRouteInfo(routeName) {
	return ROUTES.find((q) => q.name === routeName);
}
