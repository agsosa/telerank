import React, { useRef } from 'react';
import SideMenu from 'react-native-side-menu-updated';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { List, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { colors, userPlaceholderImage } from 'lib/Styles';
import { ShareApp, RateApp } from 'lib/Share';
import LanguageModal from 'components/modals/LanguageModal';
import StatsModal from 'components/modals/StatsModal';
import { getLocalizedLegalURLS, getCurrentLanguageDisplay } from 'lib/locale/Locale';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
	authBtn: {
		top: 7,
	},
	authBtnText: { alignSelf: 'center', color: 'white' },
	avatar: {
		borderRadius: 24,
		height: 48,
		width: 48,
	},
	avatarContainer: {
		marginBottom: 0,
		marginTop: 30,
		paddingLeft: 30,
		paddingVertical: 30,
	},
	featuredItemTitle: { color: 'orange', fontWeight: 'bold' },
	headerView: { flexDirection: 'row' },
	listView: { backgroundColor: 'white' },
	scrollView: {
		backgroundColor: colors.main,
		flex: 1,
		height: window.height,
		paddingVertical: 0,
		width: window.width,
	},
});

const Drawer = ({ children, isOpen, setIsOpen, navigation }) => {
	const { t } = useTranslation();
	const languageModalRef = useRef();
	const statsModalRef = useRef();

	const onMenuItemSelected = (item) => {
		setIsOpen(false);

		switch (item.toLowerCase()) {
			case 'information':
			case 'addmedia':
			case 'promote':
			case 'contact':
				if (navigation) navigation.navigate(item);
				break;
			case 'shareapp':
				ShareApp();
				break;
			case 'rateapp':
				RateApp();
				break;
			case 'stats':
				statsModalRef.current.show();
				break;
			case 'language':
				languageModalRef.current.show();
				break;
			case 'privacy':
			case 'dmca':
			case 'tos':
				if (navigation) navigation.navigate('WebViewScreen', { url: getLocalizedLegalURLS()[item] });
				break;
			default:
				break;
		}
	};

	const MenuContent = () => (
		<ScrollView scrollsToTop={false} style={styles.scrollView}>
			<View style={styles.avatarContainer}>
				<TouchableOpacity>
					<View style={styles.headerView}>
						<Image style={styles.avatar} source={userPlaceholderImage} />
						<Button mode='text' style={styles.authBtn}>
							<Text style={styles.authBtnText}>{t('drawer.login')}</Text>
						</Button>
					</View>
				</TouchableOpacity>
			</View>

			{/* onItemSelected('About') */}
			<View style={styles.listView}>
				<List.Section>
					<List.Subheader>
						<Text>{t('drawer.directory')}</Text>
					</List.Subheader>
					<List.Item title={t('drawer.addChannels')} left={(props) => <List.Icon {...props} icon='bullhorn' />} onPress={() => onMenuItemSelected('AddMedia')} />
					<List.Item title={t('drawer.addGroups')} left={(props) => <List.Icon {...props} icon='forum' />} onPress={() => onMenuItemSelected('AddMedia')} />
					<List.Item title={t('drawer.addBots')} left={(props) => <List.Icon {...props} icon='robot' />} onPress={() => onMenuItemSelected('AddMedia')} />
					<List.Item title={t('drawer.addStickers')} left={(props) => <List.Icon {...props} icon='sticker' />} onPress={() => onMenuItemSelected('AddMedia')} />
					<List.Item
						style={{ backgroundColor: colors.featuredLight }}
						titleStyle={styles.featuredItemTitle}
						title={t('drawer.promote')}
						onPress={() => onMenuItemSelected('Promote')}
						left={(props) => <List.Icon {...props} icon='star' color={colors.featured} />}
					/>
				</List.Section>
				<List.Section>
					<List.Subheader>
						<Text>Telerank</Text>
					</List.Subheader>
					<List.Item title={t('drawer.language')} description={getCurrentLanguageDisplay()} left={(props) => <List.Icon {...props} icon='cog' />} onPress={() => onMenuItemSelected('Language')} />
					<List.Item title={t('drawer.statistics')} left={(props) => <List.Icon {...props} icon='chart-bar' />} onPress={() => onMenuItemSelected('Stats')} />
					<List.Item title={t('drawer.contact')} left={(props) => <List.Icon {...props} icon='email' />} onPress={() => onMenuItemSelected('Contact')} />
					<List.Item title={t('drawer.rateApp')} left={(props) => <List.Icon {...props} icon='heart' />} onPress={() => onMenuItemSelected('RateApp')} />
					<List.Item title={t('drawer.shareApp')} left={(props) => <List.Icon {...props} icon='share-variant' />} onPress={() => onMenuItemSelected('ShareApp')} />
				</List.Section>
				<List.Section>
					<List.Subheader>
						<Text>Legal</Text>
					</List.Subheader>
					<List.Item title={t('drawer.dmca')} left={(props) => <List.Icon {...props} icon='forum' />} onPress={() => onMenuItemSelected('dmca')} />
					<List.Item title={t('drawer.privacy')} left={(props) => <List.Icon {...props} icon='forum' />} onPress={() => onMenuItemSelected('privacy')} />
					<List.Item title={t('drawer.terms')} left={(props) => <List.Icon {...props} icon='forum' />} onPress={() => onMenuItemSelected('tos')} />
				</List.Section>
			</View>
		</ScrollView>
	);

	return (
		<SideMenu menu={<MenuContent />} isOpen={isOpen} onChange={(openState) => setIsOpen(openState)}>
			{children}
			<LanguageModal ref={languageModalRef} />
			<StatsModal ref={statsModalRef} />
		</SideMenu>
	);
};

Drawer.defaultProps = {
	children: null,
	navigation: null,
};

Drawer.propTypes = {
	children: PropTypes.any,
	setIsOpen: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	navigation: PropTypes.object,
};

const mapStateToProps = ({ drawerState }) => ({
	isOpen: drawerState.isOpen,
	navigation: drawerState.navigation,
});

const mapDispatchToProps = (dispatch) => ({
	setIsOpen: dispatch.drawerState.setIsOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
