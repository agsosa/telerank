import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import VerticalList from 'components/entries/VerticalList';
import { colors } from 'lib/Styles';
import NavTabs from 'components/navigation/NavTabs';

const styles = StyleSheet.create({
	labelsContainer: {
		elevation: 1,
		marginBottom: -5,
		paddingBottom: 3,
		padding: 15,
	},
	subtitleText: {
		color: colors.grayAlt,
		fontSize: 15,
		marginBottom: 10,
		textAlign: 'center',
	},
	titleText: {
		color: colors.main,
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 5,
		textAlign: 'center',
	},
});

export default function Featured() {
	const { t } = useTranslation();

	function HeaderRenderer(title, subtitle) {
		return (
			<View>
				<View style={styles.labelsContainer}>
					<Text style={styles.titleText}>{title}</Text>
					<Text style={styles.subtitleText}>{subtitle}</Text>
				</View>
			</View>
		);
	}

	function FeaturedComponent() {
		const apiModule = 'featured';
		const name = t('navTabs.featured');
		const subtitle = t('featuredTab.featuredDesc');
		return <VerticalList useFilters Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	function TopComponent() {
		const apiModule = 'top';
		const name = t('featuredTab.topRated');
		const subtitle = t('featuredTab.topDesc');
		return <VerticalList useFilters Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	function BiggestComponent() {
		const apiModule = 'biggest';
		const name = t('featuredTab.biggest');
		const subtitle = t('featuredTab.biggestDesc');
		return <VerticalList useFilters Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	function PopularComponent() {
		const apiModule = 'popular';
		const name = t('featuredTab.popular');
		const subtitle = t('featuredTab.popularDesc');
		return <VerticalList useFilters Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	const tabs = [
		{
			name: t('navTabs.featured'),
			icon: 'star',
			component: FeaturedComponent,
		},
		{
			name: t('featuredTab.topRated'),
			icon: 'crown',
			component: TopComponent,
		},
		{
			name: t('featuredTab.biggest'),
			icon: 'account-group',
			component: BiggestComponent,
		},
		{
			name: t('featuredTab.popular'),
			icon: 'fire',
			component: PopularComponent,
		},
	];

	return <NavTabs tabs={tabs} />;
}
