import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { func, PropTypes } from 'prop-types';
import NavGradient from './NavGradient';

const styles = StyleSheet.create({
	header: { backgroundColor: 'transparent', elevation: 0 },
	navExtended: { paddingBottom: 150 },
	navNormal: { paddingBottom: 5 },
	padding: { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
});

export default function NavigationHeader({ navigation, previous, routeInfo }) {
	const route = useRoute();

	return (
		<NavGradient style={[previous && routeInfo(route).extendHeaderGradient ? styles.navExtended : styles.navNormal, styles.padding]}>
			<Appbar.Header style={styles.header}>
				{previous ? <Appbar.BackAction color='white' onPress={navigation.goBack} /> : null}

				{!previous && <Appbar.Action icon='dots-vertical' color='white' onPress={() => navigation.navigate('Settings')} />}

				<Appbar.Content color='white' title='Telerank' subtitle={routeInfo(route).title} />
			</Appbar.Header>
		</NavGradient>
	);
}

NavigationHeader.defaultProps = {
	previous: null,
};

NavigationHeader.propTypes = {
	routeInfo: PropTypes.func.isRequired,
	navigation: PropTypes.shape({
		goBack: func.isRequired,
		navigate: func.isRequired,
	}).isRequired,
	previous: PropTypes.object,
};
