import { React } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Badge, Icon } from 'native-base';
import { commonStyles, colors } from '../../config/Styles';

const styles = StyleSheet.create({
	badge: { backgroundColor: colors.featured, flexDirection: 'row' },
	icon: { color: '#fff', fontSize: 15, lineHeight: 20 },
	view: { position: 'absolute', right: '1%', top: '20%', zIndex: 5 },
});

export default function FeaturedBadge() {
	return (
		<View style={styles.view}>
			<Badge style={styles.badge}>
				<Icon name='star' style={styles.icon} />
				<Text style={commonStyles.whiteText}>Featured</Text>
			</Badge>
		</View>
	);
}
