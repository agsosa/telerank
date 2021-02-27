import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Caption } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { truncateWithEllipses, formatLanguageCode } from '../../lib/Helpers';
import Tag from '../Tag';

import { colors } from '../../config/Styles';
import FeaturedBadge from './FeaturedBadge';

const styles = StyleSheet.create({
	coverImg: { resizeMode: 'cover', width: '100%' },
	mainView: { flex: 1, padding: 5 },
});

export default function HorizontalCard({item}) {
	const navigation = useNavigation();

	return (
		<View style={styles.mainView}>
			<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Details', item)}>
				<Card elevation={2} style={[{ width: '100%', minWidth: '100%' }, item.featured && { backgroundColor: colors.featuredLight, borderColor: colors.featured, borderLeftWidth: 10 }]}>
					<Card.Title title={item.username} subtitle={`${item.type} / ${item.category} / ${formatLanguageCode(item.language)}`} />
					<Card.Cover source={{ uri: item.image }} style={styles.coverImg} />

					{item.featured && <FeaturedBadge />}

					<Card.Content style={{ marginTop: 7 }}>
						<Caption style={{ alignSelf: 'center' }}>{truncateWithEllipses(item.title, 32)}</Caption>
						<View style={{ flex: 1, flexDirection: 'row', marginTop: 5, flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 }}>
							<Tag icon='thumb-up'>{item.likes}</Tag>
							<Tag icon='thumb-down'>{item.dislikes}</Tag>
							<Tag style={{ alignSelf: 'flex-start' }} icon='account'>
								{item.members}
							</Tag>
						</View>
					</Card.Content>
				</Card>
			</TouchableOpacity>
		</View>
	);
}
