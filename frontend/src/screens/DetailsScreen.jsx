import React from 'react';
import { View, ScrollView, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Right, Card, CardItem, Thumbnail, Icon, Text, Left, Body } from 'native-base';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import NumberTag from '../components/NumberTag';
import { formatLanguageCode } from '../lib/Helpers';
import { colors } from '../config/Styles';
import FeaturedBadge from '../components/entries/FeaturedBadge';
import { ShareTelegram } from '../lib/Share';

const stylesBtn = StyleSheet.create({
	dislikeTag: { color: colors.red, fontSize: 22 },
	likeTag: { color: colors.green, fontSize: 22 },
	likesPadding: { borderWidth: 1, marginHorizontal: 5, padding: 15 },
	reportBtn: { borderColor: colors.red, borderWidth: 0.3, marginRight: 15, marginTop: 10 },
	reportContent: { color: colors.red, fontSize: 12 },
	shareBtn: { borderColor: colors.mainLight, borderWidth: 0.3, marginTop: 10 },
	shareContent: { color: colors.mainLight, fontSize: 12 },
	telegramBtn: { alignSelf: 'center', backgroundColor: colors.alt2, elevation: 5, width: '100%' },
	telegramContent: { color: 'white', fontSize: 22, fontWeight: 'normal' },
	viewButtons: { flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly', marginVertical: 5 },
});

const styles = StyleSheet.create({
	card: {
		elevation: 0.25,
	},
	centeredText: { textAlign: 'center' },
	descriptionText: { margin: 10, paddingTop: 5, textAlign: 'center' },
	disclaimerText: {
		margin: 10,
		marginBottom: 20,
		textAlign: 'center',
	},
	featuredBG: { backgroundColor: colors.featuredLight },
	featuredBadgeContainer: {
		position: 'absolute',
		right: -3,
		top: -3,
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

const placeholderImage = require('../../img/tg_placeholder.jpg');

const DetailsScreen = ({ route }) => {
	const data = route.params;
	const imageSrc = data.image && data.image.includes('storage.googleapis') ? { uri: data.image } : placeholderImage;

	const openTelegram = () => {
		try {
			Linking.openURL(`https://t.me/${data.username}`);
		} catch (e) {
			console.log(`openTelegram link error: ${e.message}`);
			alert('An error occurred while trying to open Telegram.');
		}
	};

	return (
		<View style={styles.mainView}>
			<ScrollView centerContent>
				<Card key={data._id} style={styles.card}>
					<TouchableOpacity onPress={openTelegram} activeOpacity={0.7}>
						<CardItem style={data.featured ? styles.featuredBG : {}}>
							<Left>
								<Thumbnail source={imageSrc} />
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
							<Text note>
								{data.type} / {data.category} / {formatLanguageCode(data.language)}
							</Text>
						</CardItem>

						<Image source={imageSrc} style={styles.image} />
					</TouchableOpacity>

					<Button compact style={stylesBtn.telegramBtn} onPress={openTelegram}>
						<Icon name='paper-plane' style={stylesBtn.telegramContent} />
						<Text style={stylesBtn.telegramContent}> Open Telegram</Text>
					</Button>

					<CardItem style={styles.flexCardItem}>
						<Text style={styles.descriptionText}>{data.description}</Text>
					</CardItem>

					<CardItem style={styles.flexCardItem}>
						<View style={stylesBtn.viewButtons}>
							<NumberTag icon='thumb-down' outlined style={stylesBtn.likesPadding} textStyle={stylesBtn.dislikeTag} selectedColor={colors.red} selected number={data.dislikes} />
							<NumberTag icon='thumb-up' outlined style={stylesBtn.likesPadding} textStyle={stylesBtn.likeTag} selectedColor={colors.green} selected number={data.likes} />
						</View>
						<View style={stylesBtn.viewButtons}>
							<Button style={stylesBtn.reportBtn}>
								<Icon name='flag' style={stylesBtn.reportContent} />
								<Text style={stylesBtn.reportContent}>Reportar</Text>
							</Button>
							<Button style={stylesBtn.shareBtn} onPress={() => ShareTelegram(data.username)}>
								<Icon name='share' style={stylesBtn.shareContent} />
								<Text style={stylesBtn.shareContent}>Share</Text>
							</Button>
						</View>
						<View style={styles.statsView}>
							<NumberTag icon='chart-bar' number={data.views} />
							<NumberTag icon='account' number={data.members} />
						</View>
						<Text note>Date Added: {new Date().toDateString()}</Text>
						<Text note>Last Updated: {new Date().toDateString()}</Text>
					</CardItem>
				</Card>

				<Text note style={styles.disclaimerText}>
					Please conduct your own research before trusting the content. Especially if they ask you for money.
				</Text>
			</ScrollView>
		</View>
	);
};

DetailsScreen.propTypes = {
	route: PropTypes.object.isRequired,
};

export default DetailsScreen;
