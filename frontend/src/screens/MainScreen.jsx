import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native-paper';
import HomeTab from './tabscreens/HomeTab';
import APIErrorSnackbar from '../components/APIErrorSnackbar';
import FeaturedTab from './tabscreens/FeaturedTab';
import StickersTab from './tabscreens/StickersTab';
import GroupsTab from './tabscreens/GroupsTab';
import BotsTab from './tabscreens/BotsTab';
import ChannelsTab from './tabscreens/ChannelsTab';
import NavTabs from '../components/navigation/NavTabs';
import { colors } from '../config/Styles';

const Tab = createMaterialTopTabNavigator();

/* const styles = StyleSheet.create({
	tabs: { backgroundColor: 'white', elevation: 5, marginTop: 5 },
}); */

const MainScreen = ({ setDrawerNavigation }) => {
	const navigation = useNavigation();

	// const [index, setIndex] = useState(0);

	React.useEffect(() => {
		setDrawerNavigation(navigation);
	}, []);

	const tabs = [
		{ name: 'Inicio', icon: 'home', component: HomeTab },
		{ name: 'Featured', icon: 'star', component: FeaturedTab },
		{ name: 'Canales', icon: 'bullhorn', component: ChannelsTab },
		{ name: 'Grupos', icon: 'forum', component: GroupsTab },
		{ name: 'Bots', icon: 'robot', component: BotsTab },
		{ name: 'Stickers', icon: 'sticker', component: StickersTab },
	];

	return (
		<>
			<NavTabs tabs={tabs} />
			<APIErrorSnackbar />
		</>
	);

	/* return (
		<View style={commonStyles.flex}>
			<Tabs iconPosition='leading' style={styles.tabs} mode='scrollable' showLeadingSpace onChangeIndex={(newIndex) => setIndex(newIndex)}>
				<TabScreen label='Inicio' icon='home'>
					{index === 0 ? <HomeTab /> : <LoadingIndicator />}
				</TabScreen>
				<TabScreen label='Featured' icon='star'>
					{index === 1 ? <FeaturedTab /> : <LoadingIndicator />}
				</TabScreen>
				<TabScreen label='Canales' icon='bullhorn'>
					{index === 2 ? <ChannelsTab /> : <LoadingIndicator />}
				</TabScreen>
				<TabScreen label='Grupos' icon='forum'>
					{index === 3 ? <GroupsTab /> : <LoadingIndicator />}
				</TabScreen>
				<TabScreen label='Bots' icon='robot'>
					{index === 4 ? <BotsTab /> : <LoadingIndicator />}
				</TabScreen>
				<TabScreen label='Stickers' icon='sticker'>
					{index === 5 ? <StickersTab /> : <LoadingIndicator />}
				</TabScreen>
			</Tabs>

		
		</View>
	); */
};

MainScreen.propTypes = {
	setDrawerNavigation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
	setDrawerNavigation: dispatch.drawerState.setNavigation,
});

export default connect(null, mapDispatchToProps)(MainScreen);
