import * as React from 'react';
import { PropTypes } from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native-paper';
import { colors } from '../../config/Styles';

const Tab = createMaterialTopTabNavigator();

const NavTabs = ({ tabs }) => (
	<Tab.Navigator
		lazy
		initialRouteName={tabs[0].name}
		swipeEnabled={false}
		tabBarOptions={{
			scrollEnabled: true,
			inactiveTintColor: colors.grayAlt2,
			activeTintColor: colors.main,
			labelStyle: { fontSize: 15, fontFamily: 'Roboto' },
			indicatorStyle: { backgroundColor: colors.main },
			style: { backgroundColor: 'white', elevation: 5, height: 60, justifyContent: 'center' },
			tabStyle: { width: 'auto', flexDirection: 'row' },
			iconStyle: { top: -10, right: 10 },
			showIcon: true,
		}}>
		{tabs.map((q) => (
			<Tab.Screen
				name={q.name}
				component={q.component}
				options={{ tabBarLabel: q.name, tabBarIcon: ({ focused }) => <Button icon={q.icon} labelStyle={{ fontSize: 20 }} color={focused ? colors.main : colors.grayAlt2} /> }}
			/>
		))}
	</Tab.Navigator>
);

NavTabs.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired, icon: PropTypes.string.isRequired, component: PropTypes.element.isRequired })).isRequired,
};

export default NavTabs;
