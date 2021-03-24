import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Caption } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
import FastImage from 'react-native-fast-image';
import { truncateWithEllipses, formatLanguageCode, resolveImage } from '../../lib/Helpers';
import NumberTag from '../NumberTag';
import { colors } from '../../config/Styles';
import FeaturedBadge from './FeaturedBadge';

const styles = StyleSheet.create({
	caption: { alignSelf: 'center' },
	card: { elevation: 1, marginBottom: 15 },
	cardContent: { marginTop: 7 },
	cardContentView: { flex: 1, flexDirection: 'row', marginTop: 5, flexWrap: 'wrap', justifyContent: 'space-between', padding: 5 },
	cardFeatured: { backgroundColor: colors.featuredLight, borderColor: colors.featured, borderLeftWidth: 5 },
	coverImg: { height: 150, resizeMode: 'cover' },
	featuredBadgeContainer: { position: 'absolute', right: -10, top: -5, zIndex: 1 },
	mainView: { flex: 1, padding: 5 },
	membersCount: { alignSelf: 'flex-start' },
});

export default function HorizontalCard({ item }) {
	const navigation = useNavigation();

	return (
		<View style={styles.mainView}>
			<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Details', item)}>
				<Card style={[styles.card, item.featured && styles.cardFeatured]}>
					<Card.Title title={item.username} subtitle={`${item.type} / ${item.category} / ${formatLanguageCode(item.language)}`} />
					<FastImage source={resolveImage(item)} style={styles.coverImg} />

					{item.featured && (
						<View style={styles.featuredBadgeContainer}>
							<FeaturedBadge />
						</View>
					)}

					<Card.Content style={styles.cardContent}>
						<Caption style={styles.caption}>{truncateWithEllipses(item.title, 32)}</Caption>
						<View style={styles.cardContentView}>
							<NumberTag icon='thumb-up' number={item.likes} />
							<NumberTag icon='thumb-down' number={item.dislikes} />
							<NumberTag style={styles.membersCount} icon='account' number={item.members} />
						</View>
					</Card.Content>
				</Card>
			</TouchableOpacity>
		</View>
	);
}

HorizontalCard.propTypes = {
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
