import React from 'react';
import { StyleSheet, Text, ViewPropTypes } from 'react-native';
import { Badge, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';
import { colors } from 'lib/Styles';

const styles = StyleSheet.create({
	badge: { backgroundColor: colors.featured, flexDirection: 'row', transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] },
	icon: { color: '#fff', fontSize: 10, lineHeight: 25 },
	text: { color: 'white', fontWeight: 'bold', lineHeight: 25 },
});

export default function FeaturedBadge({ style }) {
	const { t } = useTranslation();

	return (
		<Badge style={[styles.badge, style]} small>
			<Icon name='star' style={styles.icon} />
			<Text style={styles.text}>{t('navTabs.featured')}</Text>
		</Badge>
	);
}

FeaturedBadge.defaultProps = {
	style: {},
};

FeaturedBadge.propTypes = {
	style: ViewPropTypes.style,
};
