import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Card, Caption } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PropTypes } from 'prop-types';
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

export default function HorizontalCard({ item }) {
	const navigation = useNavigation();

	return <View style={styles.mainView} />;
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
