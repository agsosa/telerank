import React from 'react';
import { View, ScrollView, StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';
import { Right, Card, CardItem, Icon, Text, Left, Body } from 'native-base';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import NumberTag from 'components/NumberTag';
import { resolveImage, getEntrySubtitle } from 'lib/Helpers';
import { colors, commonStyles } from 'lib/Styles';
import FeaturedBadge from 'components/entries/FeaturedBadge';
import { ShareTelegram } from 'lib/Share';

const stylesBtn = StyleSheet.create({
	dislikeTag: { color: colors.red, fontSize: 22 },
	likeTag: { color: colors.green, fontSize: 22 },
	likesPadding: { borderWidth: 1, marginHorizontal: 5, padding: 5 },
	reportBtn: { borderColor: colors.red, borderWidth: 0.3, marginRight: 15, marginTop: 10 },
	reportContent: { color: colors.red, fontSize: 12 },
	shareBtn: { borderColor: colors.mainLight, borderWidth: 0.3, marginTop: 10 },
	shareContent: { color: colors.mainLight, fontSize: 12 },
	telegramBtn: { alignSelf: 'center', backgroundColor: 'transparent', borderColor: colors.main, marginTop: 15, width: '100%' },
	telegramContent: { color: colors.main, fontSize: 22, fontWeight: 'normal' },
	viewButtons: { flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly', marginVertical: 5 },
});

const styles = StyleSheet.create({
	card: {
		elevation: 0.25,
	},
	centeredText: { textAlign: 'center' },
	descriptionText: { margin: 5, textAlign: 'center' },
	disclaimerText: {
		margin: 10,
		marginBottom: 20,
		textAlign: 'center',
	},
	featuredBG: { backgroundColor: colors.featuredLight },
	featuredBadgeContainer: {
		position: 'absolute',
		right: -8,
		top: -4,
		zIndex: 5,
	},
	flexCardItem: { flex: 1, flexDirection: 'column' },
	image: { height: 200, width: '100%' },
	mainView: {
		alignSelf: 'center',
		bottom: 0,
		position: 'absolute',
		top: -150,
		width: '95%',
		zIndex: 100,
	},
	statsView: { flex: 1, flexDirection: 'row', justifyContent: 'center', marginVertical: 5 },
	titleCard: { alignSelf: 'center', flexDirection: 'column', marginVertical: 5 },
});

const DetailsScreen = ({ route }) => {
	const data = route.params;
	const { t } = useTranslation();

	const openTelegram = () => {
		try {
			Linking.openURL(`https://t.me/${data.username}`);
		} catch (e) {
			console.log(`openTelegram link error: ${e.message}`);
			Alert.alert('Error', t('errorOccurred'), [{ text: 'OK' }]);
		}
	};

	return (
		<View style={styles.mainView}>
			<ScrollView centerContent>
				<Card key={data._id} style={styles.card}>
					<TouchableOpacity onPress={openTelegram} activeOpacity={0.7}>
						<CardItem style={data.featured ? styles.featuredBG : {}}>
							<Left>
								<FastImage source={resolveImage(data)} style={commonStyles.thumbnail} />
								<Body>
									<Text>@{data.username}</Text>
								</Body>
							</Left>
							{data.featured && (
								<Right style={styles.featuredBadgeContainer}>
									<FeaturedBadge />
								</Right>
							)}
						</CardItem>
						<CardItem style={styles.titleCard}>
							<Text style={styles.centeredText}>{data.title}</Text>
							<Text note>{getEntrySubtitle(data)}</Text>
						</CardItem>

						<FastImage source={resolveImage(data)} style={styles.image} />
					</TouchableOpacity>

					<Button compact style={stylesBtn.telegramBtn} onPress={openTelegram}>
						<Icon name='paper-plane' style={stylesBtn.telegramContent} />
						<Text style={stylesBtn.telegramContent}> {t('detailsScreen.openTG')}</Text>
					</Button>

					<CardItem style={styles.flexCardItem}>
						<Text style={styles.descriptionText}>{data.description ? data.description : t('detailsScreen.noDescription')}</Text>
					</CardItem>

					<CardItem style={styles.flexCardItem}>
						<View style={stylesBtn.viewButtons}>
							<NumberTag icon='thumb-down' outlined style={stylesBtn.likesPadding} textStyle={stylesBtn.dislikeTag} selectedColor={colors.red} selected number={data.dislikes} />
							<NumberTag icon='thumb-up' outlined style={stylesBtn.likesPadding} textStyle={stylesBtn.likeTag} selectedColor={colors.green} selected number={data.likes} />
						</View>
						<View style={stylesBtn.viewButtons}>
							<Button style={stylesBtn.reportBtn}>
								<Icon name='flag' style={stylesBtn.reportContent} />
								<Text style={stylesBtn.reportContent}>{t('detailsScreen.report')}</Text>
							</Button>
							<Button style={stylesBtn.shareBtn} onPress={() => ShareTelegram(data.username)}>
								<Icon name='share' style={stylesBtn.shareContent} />
								<Text style={stylesBtn.shareContent}>{t('detailsScreen.share')}</Text>
							</Button>
						</View>
						<View style={styles.statsView}>
							<NumberTag icon='chart-bar' number={data.views} />
							<NumberTag icon='account' number={data.members} />
						</View>
						<Text note>
							{t('detailsScreen.addedDate')}: {moment(data.addedDate).format('YYYY-MM-DD')}
						</Text>
						<Text note>
							{t('detailsScreen.updateDate')}: {moment(data.updatedDate).format('YYYY-MM-DD')}
						</Text>
					</CardItem>
				</Card>

				<Text note style={styles.disclaimerText}>
					{t('detailsScreen.disclaimer')}
				</Text>
			</ScrollView>
		</View>
	);
};

DetailsScreen.propTypes = {
	route: PropTypes.object.isRequired,
};

export default DetailsScreen;
