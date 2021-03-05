import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Right, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
import NumberTag from '../NumberTag';
import { formatLanguageCode } from '../../lib/Helpers';
import { commonStyles, colors } from '../../config/Styles';
import FeaturedBadge from './FeaturedBadge';

const styles = StyleSheet.create({
	featuredBG: { backgroundColor: colors.featuredLight },
	featuredBadgeContainer: { position: 'absolute', right: '0%', top: '-10%', zIndex: 5 },
	featuredCard: { borderColor: '#FFB400', borderLeftWidth: 5 },
	membersTag: { alignSelf: 'flex-start' },
	statsView: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		flexWrap: 'wrap',
		alignItems: 'center',
		padding: 10,
	},
});

const placeholderImage = require('../../../img/tg_placeholder.jpg');

export default function VerticalCard({ item }) {
	const navigation = useNavigation();

	const imageSrc = item.image && item.image.includes('storage.googleapis') ? { uri: item.image } : placeholderImage;

	return (
		<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Details', item)}>
			<Card style={[commonStyles.flex, item.featured && styles.featuredCard]}>
				<CardItem style={item.featured ? styles.featuredBG : {}}>
					<Left>
						<Thumbnail source={imageSrc} />
						<Body>
							<Text>{item.username}</Text>
							<Text note>
								{item.type} / {item.category} / {formatLanguageCode(item.language)}
							</Text>
						</Body>
					</Left>

					{item.featured && (
						<Right style={styles.featuredBadgeContainer}>
							<FeaturedBadge />
						</Right>
					)}
				</CardItem>
				<CardItem style={item.featured ? styles.featuredBG : {}}>
					<Body>
						<Text>{item.title}</Text>

						<View style={styles.statsView}>
							<NumberTag icon='thumb-up' number={item.likes} />
							<NumberTag icon='thumb-down' number={item.dislikes} />
							<NumberTag style={styles.membersTag} icon='account' number={item.members} />
						</View>
					</Body>
				</CardItem>
			</Card>
		</TouchableOpacity>
	);
}

VerticalCard.propTypes = {
	item: PropTypes.shape({
		featured: PropTypes.bool,
		members: PropTypes.number,
		likes: PropTypes.number,
		dislikes: PropTypes.number,
		title: PropTypes.string,
		category: PropTypes.string,
		language: PropTypes.string,
		image: PropTypes.string,
		type: PropTypes.string,
		username: PropTypes.string,
	}).isRequired,
};
