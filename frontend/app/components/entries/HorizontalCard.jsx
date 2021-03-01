import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Caption } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { truncateWithEllipses, formatLanguageCode } from '../../lib/Helpers';
import Tag from '../Tag';

import { colors } from '../../config/Styles';
import FeaturedBadge from './FeaturedBadge';

const styles = StyleSheet.create({
	caption: { alignSelf: 'center' },
	card: { minWidth: '100%', width: '100%' },
	cardContent: { marginTop: 7 },
	cardContentView: { flex: 1, flexDirection: 'row', marginTop: 5, flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 },
	cardFeatured: { backgroundColor: colors.featuredLight, borderColor: colors.featured, borderLeftWidth: 10 },
	coverImg: { resizeMode: 'cover', width: '100%' },
	mainView: { flex: 1, padding: 5 },
	membersCount: { alignSelf: 'flex-start' },
});

export default function HorizontalCard({item}) {
	const navigation = useNavigation();

	return (
		<View style={styles.mainView}>
			<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Details', item)}>
				<Card elevation={2} style={[styles.card, item.featured && styles.cardFeatured]}>
					<Card.Title title={item.username} subtitle={`${item.type} / ${item.category} / ${formatLanguageCode(item.language)}`} />
					<Card.Cover source={{ uri: item.image }} style={styles.coverImg} />

					{item.featured && <FeaturedBadge />}

					<Card.Content style={styles.cardContent}>
						<Caption style={styles.caption}>{truncateWithEllipses(item.title, 32)}</Caption>
						<View style={styles.cardContentView}>
							<Tag icon='thumb-up'>{item.likes}</Tag>
							<Tag icon='thumb-down'>{item.dislikes}</Tag>
							<Tag style={styles.membersCount} icon='account'>
								{item.members}
							</Tag>
						</View>
					</Card.Content>
				</Card>
			</TouchableOpacity>
		</View>
	);
}