import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import HomeTab from './tabscreens/HomeTab';
import APIErrorSnackbar from '../components/APIErrorSnackbar';
import FeaturedTab from './tabscreens/FeaturedTab';
import StickersTab from './tabscreens/StickersTab';
import GroupsTab from './tabscreens/GroupsTab';
import BotsTab from './tabscreens/BotsTab';
import ChannelsTab from './tabscreens/ChannelsTab';
import NavTabs from '../components/navigation/NavTabs';

const MainScreen = ({ setDrawerNavigation }) => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const tabs = [
		{ name: t('navtabs.home'), icon: 'home', component: HomeTab },
		{ name: t('navtabs.featured'), icon: 'star', component: FeaturedTab },
		{ name: t('navtabs.channels'), icon: 'bullhorn', component: ChannelsTab },
		{ name: t('navtabs.groups'), icon: 'forum', component: GroupsTab },
		{ name: t('navtabs.bots'), icon: 'robot', component: BotsTab },
		{ name: t('navtabs.stickers'), icon: 'sticker', component: StickersTab },
	];

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
