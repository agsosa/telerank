import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Right, Card, CardItem, Text, Left, Body } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
import FastImage from 'react-native-fast-image';
import NumberTag from '../NumberTag';
import { resolveImage, getEntrySubtitle } from '../../lib/Helpers';
import { colors, commonStyles } from '../../config/Styles';
import FeaturedBadge from './FeaturedBadge';

const styles = StyleSheet.create({
	card: { elevation: 1, flex: 1 },
	featuredBG: { backgroundColor: colors.featuredLight },
	featuredBadgeContainer: { position: 'absolute', right: '0%', top: '-10%', zIndex: 5 },
	featuredCard: { borderColor: colors.featured, borderLeftWidth: 5 },
	membersTag: { alignSelf: 'flex-start' },
	statsView: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		flexWrap: 'wrap',
		alignItems: 'center',
		padding: 10,
	},
	textDescription: { color: colors.grayAlt, fontSize: 15, marginTop: -10 },
});

function VerticalCard({ item }) {
	const navigation = useNavigation();

	return (
		<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Details', item)}>
			<Card style={[styles.card, item.featured && styles.featuredCard]}>
				<CardItem style={item.featured ? styles.featuredBG : {}}>
					<Left>
						<FastImage source={resolveImage(item)} style={commonStyles.thumbnail} />
						<Body>
							<Text>{item.username}</Text>
							<Text note>{getEntrySubtitle(item)}</Text>
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
						<Text style={styles.textDescription}>{item.title}</Text>

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

export default memo(VerticalCard);
