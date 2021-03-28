import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native-paper';
import { colors } from '../../config/Styles';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
	icon: { right: 10, top: -10 },
	indicator: { backgroundColor: colors.main },
	label: { fontFamily: 'Roboto', fontSize: 15 },
	tab: { flexDirection: 'row', width: 'auto' },
	tabBar: { backgroundColor: 'white', elevation: 5, height: 60, justifyContent: 'center' },
	tabScreenLabel: { fontSize: 20 },
});

const NavTabs = ({ tabs }) => (
	<Tab.Navigator
		lazy
		initialRouteName={tabs[0].name}
		swipeEnabled={false}
		tabBarOptions={{
			scrollEnabled: true,
			inactiveTintColor: colors.grayAlt2,
			activeTintColor: colors.main,
			labelStyle: styles.label,
			indicatorStyle: styles.indicator,
			style: styles.tabBar,
			tabStyle: styles.tab,
			iconStyle: styles.icon,
			showIcon: true,
		}}>
		{tabs.map((q) => (
			<Tab.Screen
				key={q.name}
				name={q.name}
				component={q.component}
				// eslint-disable-next-line react/prop-types
				options={{ tabBarLabel: q.name, tabBarIcon: ({ focused }) => <Button icon={q.icon} labelStyle={styles.tabScreenLabel} color={focused ? colors.main : colors.grayAlt2} /> }}
			/>
		))}
	</Tab.Navigator>
);

NavTabs.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired, icon: PropTypes.string.isRequired, component: PropTypes.any.isRequired })).isRequired,
};

export default NavTabs;
