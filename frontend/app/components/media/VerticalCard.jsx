import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Right, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
import Tag from '../Tag';
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

export default function VerticalCard({ item }) {
	const navigation = useNavigation();

	return (
		<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Details', item)}>
			<Card style={[commonStyles.flex, item.featured && styles.featuredCard]}>
				<CardItem style={item.featured ? styles.featuredBG : {}}>
					<Left>
						<Thumbnail source={{ uri: item.image }} />
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
							<Tag icon='thumb-up'>
								<Text>{item.likes}</Text>
							</Tag>
							<Tag icon='thumb-down'>
								<Text>{item.dislikes}</Text>
							</Tag>
							<Tag style={styles.membersTag} icon='account'>
								<Text>{item.members}</Text>
							</Tag>
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
