import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { commonStyles } from '../config/Styles';
import HomeTab from './tabscreens/HomeTab';
import APIErrorSnackbar from '../components/APIErrorSnackbar';
import FeaturedTab from './tabscreens/FeaturedTab';
import StickersTab from './tabscreens/StickersTab';
import GroupsTab from './tabscreens/GroupsTab';
import BotsTab from './tabscreens/BotsTab';
import ChannelsTab from './tabscreens/ChannelsTab';

const styles = StyleSheet.create({
	tabs: { backgroundColor: 'white', elevation: 5, marginTop: 5 },
});

const MainScreen = ({ setDrawerNavigation }) => {
	const navigation = useNavigation();

	React.useEffect(() => {
		setDrawerNavigation(navigation);
	}, []);

	return (
		<View style={commonStyles.flex}>
			<Tabs iconPosition='leading' style={styles.tabs} mode='scrollable' showLeadingSpace>
				<TabScreen label='Inicio' icon='home'>
					<HomeTab />
				</TabScreen>
				<TabScreen label='Featured' icon='star'>
					<FeaturedTab />
				</TabScreen>
				<TabScreen label='Canales' icon='bullhorn'>
					<ChannelsTab />
				</TabScreen>
				<TabScreen label='Grupos' icon='forum'>
					<GroupsTab />
				</TabScreen>
				<TabScreen label='Bots' icon='robot'>
					<BotsTab />
				</TabScreen>
				<TabScreen label='Stickers' icon='sticker'>
					<StickersTab />
				</TabScreen>
			</Tabs>

			<APIErrorSnackbar />
		</View>
	);
};

MainScreen.propTypes = {
	setDrawerNavigation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	setDrawerNavigation: dispatch.drawerState.setNavigation,
});

export default connect(null, mapDispatchToProps)(MainScreen);
