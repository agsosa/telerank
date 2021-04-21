import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import HomeTab from 'screens/tabscreens/HomeTab';
import APIErrorSnackbar from 'components/APIErrorSnackbar';
import FeaturedTab from 'screens/tabscreens/FeaturedTab';
import StickersTab from 'screens/tabscreens/StickersTab';
import GroupsTab from 'screens/tabscreens/GroupsTab';
import BotsTab from 'screens/tabscreens/BotsTab';
import ChannelsTab from 'screens/tabscreens/ChannelsTab';
import NavTabs from 'components/navigation/NavTabs';

const MainScreen = ({ setDrawerNavigation }) => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const tabs = [
		{ name: t('navTabs.home'), icon: 'home', component: HomeTab },
		{ name: t('navTabs.featured'), icon: 'star', component: FeaturedTab },
		{ name: t('navTabs.channels'), icon: 'bullhorn', component: ChannelsTab },
		{ name: t('navTabs.groups'), icon: 'forum', component: GroupsTab },
		{ name: t('navTabs.bots'), icon: 'robot', component: BotsTab },
		{ name: t('navTabs.stickers'), icon: 'sticker', component: StickersTab },
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
