import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Badge, Icon } from 'native-base';
import { colors } from '../../config/Styles';

const styles = StyleSheet.create({
	badge: { backgroundColor: colors.featured, flexDirection: 'row' },
	icon: { color: '#fff', fontSize: 15, lineHeight: 25 },
	text: { color: 'white', lineHeight: 25 },
});

export default function FeaturedBadge() {
	return (
		<Badge style={styles.badge}>
			<Icon name='star' style={styles.icon} />
			<Text style={styles.text}>Featured</Text>
		</Badge>
	);
}
