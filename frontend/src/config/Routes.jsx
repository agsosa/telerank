import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationHeader from '../components/navigation/NavigationHeader';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';
import InformationScreen from '../screens/InformationScreen';
import ContactScreen from '../screens/ContactScreen';
import AddMediaScreen from '../screens/AddMediaScreen';
import PromoteScreen from '../screens/PromoteScreen';

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
	{
		name: 'PrivacyPolicy',
		component: PrivacyPolicyScreen,
		extendHeaderGradient: false,
		title: 'Privacy Policy',
	},
	{
		name: 'TermsAndConditions',
		component: TermsAndConditionsScreen,
		extendHeaderGradient: false,
		title: 'Terms and Conditions',
	},
	{
		name: 'Information',
		component: InformationScreen,
		extendHeaderGradient: false,
		title: 'Information',
	},
	{
		name: 'Contact',
		component: ContactScreen,
		extendHeaderGradient: false,
		title: 'Contact',
	},
	{
		name: 'AddMedia',
		component: AddMediaScreen,
		extendHeaderGradient: false,
		title: 'Add to Directory',
	},
	{
		name: 'Promote',
		component: PromoteScreen,
		extendHeaderGradient: false,
		title: 'Promote/Feature',
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
