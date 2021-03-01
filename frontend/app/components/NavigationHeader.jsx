import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { func, PropTypes } from 'prop-types';
import NavGradient from './NavGradient';

const styles = StyleSheet.create({
	header: { backgroundColor: 'transparent', elevation: 0 },
	navExtended: { paddingBottom: 150 },
	navNormal: { paddingBottom: 5 },
});

export default function NavigationHeader({ navigation, previous, routeInfo }) {
	const [visible, setVisible] = React.useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);
	const route = useRoute();

	return (
		<NavGradient style={previous && routeInfo(route).extendHeaderGradient ? styles.navExtended : styles.navNormal}>
			<Appbar.Header style={styles.header}>
				{previous ? <Appbar.BackAction color='white' onPress={navigation.goBack} /> : null}

				{!previous && <Appbar.Action icon='cog' color='white' onPress={() => navigation.navigate('Settings')} />}

				<Appbar.Content color='white' title='Telerank' subtitle={routeInfo(route).title} />

				{!previous && (
					<Menu visible={visible} onDismiss={closeMenu} anchor={<Appbar.Action icon='dots-vertical' color='white' onPress={openMenu} />}>
						<Menu.Item onPress={() => {}} title='Option 1' />
						<Menu.Item onPress={() => {}} title='Option 2' />
						<Menu.Item onPress={() => {}} title='Option 3' disabled />
					</Menu>
				)}
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
