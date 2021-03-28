import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import VerticalList from '../../components/entries/VerticalList';
import { colors } from '../../config/Styles';
import NavTabs from '../../components/navigation/NavTabs';

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
		const name = 'Featured';
		const subtitle = 'Premium channels, groups and bots';
		return <VerticalList useFilters Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	function TopComponent() {
		const apiModule = 'top';
		const name = 'Top 50';
		const subtitle = 'Tell your community to rate you in our app to get better rankings!';
		return <VerticalList useFilters Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	function BiggestComponent() {
		const apiModule = 'biggest';
		const name = 'Biggest';
		const subtitle = 'Top 50 biggest channels and groups by members';
		return <VerticalList useFilters Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	function PopularComponent() {
		const apiModule = 'popular';
		const name = 'Popular';
		const subtitle = 'Top 50 most viewed channels, bots, groups and stickers';
		return <VerticalList useFilters Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	const tabs = [
		{
			name: 'Featured',
			icon: 'star',
			component: FeaturedComponent,
		},
		{
			name: 'Top Rated',
			icon: 'crown',
			component: TopComponent,
		},
		{
			name: 'Biggest',
			icon: 'account-group',
			component: BiggestComponent,
		},
		{
			name: 'Popular',
			icon: 'fire',
			component: PopularComponent,
		},
	];

	return <NavTabs tabs={tabs} />;
}
