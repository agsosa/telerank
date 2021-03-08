import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { ListItem, CheckBox, Body } from 'native-base';
import Stats from '../../components/entries/Stats';
import GlobalSearch from '../../components/entries/GlobalSearch';
import VerticalList from '../../components/entries/VerticalList';
import SectionTitle from '../../components/SectionTitle';
import { getModuleData } from '../../lib/API';
import HorizontalList from '../../components/entries/HorizontalList';
import AddMediaInfoBanner from '../../components/infobanners/AddMediaInfoBanner';
import FeatureInfoBanner from '../../components/infobanners/FeatureInfoBanner';
import { colors } from '../../config/Styles';
import InfoBanner from '../../components/infobanners/InfoBanner';

const styles = StyleSheet.create({
	checkboxLabel: {
		color: colors.tgDarkGray,
		top: 6,
	},
	descriptionText: (bold = false) => ({
		color: 'gray',
		fontSize: 17,
		padding: 10,
		textAlign: 'center',
		fontWeight: bold ? 'bold' : 'normal',
	}),
	filterText: {
		padding: 5,
	},
	itemView: { alignItems: 'stretch', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', marginRight: 15, width: 'auto' },
	listView: {
		flexDirection: 'row',
	},
	mainView: {
		alignContent: 'center',
		alignItems: 'center',
		marginVertical: 3,
		padding: 5,
	},
	subtitleText: {
		color: colors.grayAlt,
		fontSize: 20,
		textAlign: 'center',
	},
	titleText: {
		color: colors.main,
		fontSize: 26,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default function TopTab() {
	const [statsData, setStatsData] = useState({});
	const [entriesData, setEntriesData] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	// TODO: Modularizar
	const refreshData = async () => {
		setLoading(true);
		setEntriesData([]);

		// TODO: Cancel promises on unmount
		const a = getModuleData('Home')
			.then((result) => {
				if (setEntriesData) setEntriesData(result);
			})
			.catch((reason) => {
				console.log(`getModuleData rejected with reason ${reason}`);
			});

		const b = getModuleData('Stats')
			.then((result) => {
				if (setStatsData) setStatsData(result);
			})
			.catch((reason) => {
				console.log(`getModuleData rejected with reason ${reason}`);
			});

		await Promise.all([a, b]).then(() => setLoading(false));
	};

	useEffect(() => {
		refreshData();
	}, []);

	function HeaderRenderer() {
		return (
			<View style={styles.mainView}>
				<Text style={styles.titleText}>Top 100</Text>
				<Text style={styles.subtitleText}>Channels, Groups, Bots and Stickers</Text>
				<Text style={styles.descriptionText()}>This is a list of the best 100 Telegram channels, groups, bots and stickers in our directory ordered by ratings and member count.</Text>
				<Text style={styles.descriptionText(true)}>Tell your community to rate you in this app to get better rankings!</Text>

				<SectionTitle style={styles.filterText} size={15} text='Types' />

				<View style={styles.listView}>
					<View style={styles.itemView}>
						<Checkbox status='checked' color={colors.main} />
						<Text style={styles.checkboxLabel}>Channels</Text>
					</View>
					<View style={styles.itemView}>
						<Checkbox status='checked' color={colors.main} />
						<Text style={styles.checkboxLabel}>Groups</Text>
					</View>
					<View style={styles.itemView}>
						<Checkbox status='checked' color={colors.main} />
						<Text style={styles.checkboxLabel}>Bots</Text>
					</View>
					<View style={styles.itemView}>
						<Checkbox status='checked' color={colors.main} />
						<Text style={styles.checkboxLabel}>Stickers</Text>
					</View>
				</View>
				<SectionTitle style={styles.filterText} size={15} text='Languages' />
				<View style={styles.listView}>
					<View style={styles.itemView}>
						<Checkbox />
						<Text style={styles.checkboxLabel} color={colors.main}>
							English
						</Text>
					</View>
					<View style={styles.itemView}>
						<Checkbox />
						<Text style={styles.checkboxLabel} color={colors.main}>
							Español
						</Text>
					</View>
				</View>
			</View>
		);
	}

	function FooterRenderer() {
		return <View />;
	}

	return <VerticalList Header={HeaderRenderer} Footer={FooterRenderer} data={entriesData} loading={loading} refreshFunc={refreshData} />;
}
