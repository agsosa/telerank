import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import HomeTab from './tabscreens/HomeTab';
import APIErrorSnackbar from '../components/APIErrorSnackbar';
import FeaturedTab from './tabscreens/FeaturedTab';
import StickersTab from './tabscreens/StickersTab';
import GroupsTab from './tabscreens/GroupsTab';
import BotsTab from './tabscreens/BotsTab';
import ChannelsTab from './tabscreens/ChannelsTab';
import NavTabs from '../components/navigation/NavTabs';

const tabs = [
	{ name: 'Inicio', icon: 'home', component: HomeTab },
	{ name: 'Featured', icon: 'star', component: FeaturedTab },
	{ name: 'Canales', icon: 'bullhorn', component: ChannelsTab },
	{ name: 'Grupos', icon: 'forum', component: GroupsTab },
	{ name: 'Bots', icon: 'robot', component: BotsTab },
	{ name: 'Stickers', icon: 'sticker', component: StickersTab },
];

const MainScreen = ({ setDrawerNavigation }) => {
	const navigation = useNavigation();

	React.useEffect(() => {
		setDrawerNavigation(navigation);
	}, []);

	return (
		<>
			<NavTabs tabs={tabs} />
			<APIErrorSnackbar />
		</>
	);
};

MainScreen.propTypes = {
	setDrawerNavigation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	setDrawerNavigation: dispatch.drawerState.setNavigation,
});

export default connect(null, mapDispatchToProps)(MainScreen);
