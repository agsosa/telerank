import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import VerticalList from '../../components/entries/VerticalList';
import { colors, commonStyles } from '../../config/Styles';
import Filters from '../../components/entries/Filters';
import NavTabs from '../../components/navigation/NavTabs';

/* const tabs = [
	{ apiModule: 'featured', title: 'Featured', icon: 'star', color: colors.featured, subtitle: 'Premium channels and groups'  },
	{ apiModule: 'top', title: 'Top Rated', icon: 'crown', color: colors.grayAlt2, subtitle: 'Tell your community to rate you in our app to get better rankings!' },
	{ apiModule: 'biggest', title: 'Biggest', icon: 'account-group', color: colors.grayAlt2, subtitle: 'Top 100 biggest channels and groups by members' },
	{ apiModule: 'popular', title: 'Popular', icon: 'fire', color: colors.grayAlt2, subtitle: 'Top 100 most viewed channels, bots, groups and stickers' },
]; */

/* const tabStyles2 = StyleSheet.create({
	tabs: { backgroundColor: 'white', elevation: 5, marginTop: 5 },
});

const tabStyles = StyleSheet.create({
	btn: (color, active) => ({
		borderBottomWidth: active ? 2 : 0,
		borderColor: color,
		paddingBottom: 0,
	}),
	btnContent: { marginHorizontal: -5, marginVertical: 5, paddingBottom: 5, top: 5 },
	btnText: {
		color: colors.grayAlt2,
		top: 6,
	},
	mainView: { alignItems: 'center', backgroundColor: 'white', elevation: 3, width: '100%' },
	scrollView: {},
}); */

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
	// const [currTab, setCurrTab] = useState(0);

	/* const CustomTabs = () => (
		<View style={tabStyles.mainView}>
			<ScrollView showsHorizontalScrollIndicator={false} horizontal style={tabStyles.scrollView}>
				{Object.keys(tabs).map((q) => {
					const t = tabs[q];
					const isActive = currTab === q;
					return (
						<Button key={q} icon={t.icon} contentStyle={tabStyles.btnContent} style={tabStyles.btn(t.color, isActive)} color={t.color} onPress={() => setCurrTab(q)}>
							<Text style={tabStyles.btnText}>{t.title}</Text>
						</Button>
					);
				})}
			</ScrollView>
		</View>
	); */

	function HeaderRenderer(title, subtitle) {
		return (
			<View>
				{/* <CustomTabs /> */}
				<View style={styles.labelsContainer}>
					<Text style={styles.titleText}>{title}</Text>
					<Text style={styles.subtitleText}>{subtitle}</Text>
					<Filters />
				</View>
			</View>
		);
	}

	function FeaturedComponent() {
		const apiModule = 'featured';
		const name = 'Featured';
		const subtitle = 'Premium channels and groups';
		return <VerticalList Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	function TopComponent() {
		const apiModule = 'top';
		const name = 'Top 50';
		const subtitle = 'Tell your community to rate you in our app to get better rankings!';
		return <VerticalList Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	function BiggestComponent() {
		const apiModule = 'biggest';
		const name = 'Biggest';
		const subtitle = 'Top 50 biggest channels and groups by members';
		return <VerticalList Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	function PopularComponent() {
		const apiModule = 'popular';
		const name = 'Popular';
		const subtitle = 'Top 50 most viewed channels, bots, groups and stickers';
		return <VerticalList Header={() => HeaderRenderer(name, subtitle)} apiModule={apiModule} />;
	}

	/* eslint-disable react/no-this-in-sfc */
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
	/* <View style={commonStyles.flex}>
			<Tabs iconPosition='leading' mode='scrollable' showLeadingSpace style={tabStyles2.tabs}>
				{tabs.map((q, i) => (
					<TabScreen key={q.apiModule} label={q.title} icon={q.icon}>
						<VerticalList Header={() => HeaderRenderer(i)} apiModule={q.apiModule} />
					</TabScreen>
				))}
				</Tabs> */
	/* <VerticalList Header={HeaderRenderer} apiModule={tabs[currTab].apiModule} /> */
}
