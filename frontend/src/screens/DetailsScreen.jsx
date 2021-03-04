import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Right, Card, CardItem, Thumbnail, Icon, Text, Left, Body } from 'native-base';
import { Button } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import NumberTag from '../components/NumberTag';
import { formatLanguageCode } from '../lib/Helpers';
import { colors, telegramPlaceholderImgUrl } from '../config/Styles';
import FeaturedBadge from '../components/entries/FeaturedBadge';

const stylesBtn = StyleSheet.create({
	dislikeTag: { color: colors.red, fontSize: 22 },
	likeTag: { color: colors.green, fontSize: 22 },
	likesPadding: { marginHorizontal: 5, padding: 15 },
	reportBtn: { borderColor: colors.red, borderWidth: 0.3, marginRight: 15, marginTop: 10 },
	reportContent: { color: colors.red, fontSize: 12 },
	shareBtn: { borderColor: colors.mainLight, borderWidth: 0.3, marginTop: 10 },
	shareContent: { color: colors.mainLight, fontSize: 12 },
	telegramBtn: { alignSelf: 'center', backgroundColor: colors.main, marginHorizontal: 40, marginVertical: 5, padding: 5, paddingHorizontal: 'auto' },
	telegramContent: { color: 'white', fontSize: 20 },
	viewButtons: { flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-evenly', marginVertical: 10 },
});

const styles = StyleSheet.create({
	card: {
		elevation: 1,
	},
	centeredText: { textAlign: 'center' },
	descriptionText: { margin: 10, paddingTop: 5, textAlign: 'center' },
	disclaimerText: {
		margin: 10,
		marginBottom: 20,
		textAlign: 'center',
	},
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
		width: '90%',
		zIndex: 100,
	},
	statsView: { flex: 1, flexDirection: 'row', justifyContent: 'center', marginVertical: 5 },
	titleCard: { alignSelf: 'center', marginBottom: 10 },
});

const DetailsScreen = ({ route }) => {
	const data = route.params;

	const imageURL = data.image && data.image.includes('storage.googleapis') ? data.image : telegramPlaceholderImgUrl;

	return (
		<View style={styles.mainView}>
			<ScrollView centerContent>
				<Card key={data._id} style={styles.card}>
					<CardItem>
						<Left>
							<Thumbnail source={{ uri: imageURL }} />
							<Body>
								<Text>{data.username}</Text>
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
					</CardItem>

					<Image source={{ uri: imageURL }} style={styles.image} />

					<CardItem style={styles.flexCardItem}>
						<Text note>
							{data.type} / {data.category} / {formatLanguageCode(data.language)}
						</Text>
						<Text style={styles.descriptionText}>{data.description}</Text>
						<View style={stylesBtn.viewButtons}>
							<NumberTag icon='thumb-down' outlined style={stylesBtn.likesPadding} textStyle={stylesBtn.dislikeTag} selectedColor={colors.red} selected number={data.dislikes} />
							<NumberTag icon='thumb-up' outlined style={stylesBtn.likesPadding} textStyle={stylesBtn.likeTag} selectedColor={colors.green} selected number={data.likes} />
						</View>
					</CardItem>

					<Button style={stylesBtn.telegramBtn}>
						<Icon name='paper-plane' style={stylesBtn.telegramContent} />
						<Text style={stylesBtn.telegramContent}>Telegram</Text>
					</Button>

					<CardItem style={styles.flexCardItem}>
						<View style={stylesBtn.viewButtons}>
							<Button style={stylesBtn.reportBtn}>
								<Icon name='flag' style={stylesBtn.reportContent} />
								<Text style={stylesBtn.reportContent}>Reportar</Text>
							</Button>
							<Button style={stylesBtn.shareBtn}>
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
