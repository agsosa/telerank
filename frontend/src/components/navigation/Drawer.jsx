import React, { useState } from 'react';
import SideMenu from 'react-native-side-menu-updated';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../config/Styles';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
	avatar: {
		borderRadius: 24,
		flex: 1,
		height: 48,
		width: 48,
	},
	avatarContainer: {
		marginBottom: 20,
		marginTop: 20,
	},
	item: {
		fontSize: 14,
		fontWeight: '300',
		paddingTop: 5,
	},
	menu: {
		backgroundColor: 'white',
		flex: 1,
		height: window.height,
		padding: 20,
		width: window.width,
	},
	name: {
		left: 70,
		position: 'absolute',
		top: 20,
	},
});

const MenuContent = ({ onItemSelected }) => (
	<ScrollView scrollsToTop={false} style={styles.menu}>
		<View style={styles.avatarContainer}>
			<Image style={styles.avatar} source={{ uri }} />
			<Text style={styles.name}>Your name</Text>
		</View>

		<Text onPress={() => onItemSelected('About')} style={styles.item}>
			About
		</Text>

		<Text onPress={() => onItemSelected('Contacts')} style={styles.item}>
			Contacts
		</Text>
	</ScrollView>
);

const Drawer = ({ children, isOpen, setIsOpen }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	const onMenuItemSelected = (item) => {
		setIsOpen(false);
		setSelectedItem(item);
	};

	const menu = <MenuContent onItemSelected={onMenuItemSelected} />;

	return (
		<SideMenu menu={menu} isOpen={isOpen} onChange={(openState) => setIsOpen(openState)}>
			{children}
		</SideMenu>
	);
};

Drawer.defaultProps = {
	children: null,
};

Drawer.propTypes = {
	children: PropTypes.any,
	setIsOpen: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

MenuContent.propTypes = {
	onItemSelected: PropTypes.func.isRequired,
};

const mapStateToProps = ({ drawerState }) => ({
	isOpen: drawerState.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
	setIsOpen: dispatch.drawerState.setIsOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
