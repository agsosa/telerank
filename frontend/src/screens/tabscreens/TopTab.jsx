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
import Filters from '../../components/entries/Filters';

const styles = StyleSheet.create({
	descriptionText: (bold = false) => ({
		color: 'gray',
		fontSize: 17,
		padding: 10,
		textAlign: 'center',
		fontWeight: bold ? 'bold' : 'normal',
	}),
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
	const navigation = useNavigation();

	function HeaderRenderer() {
		return (
			<View style={styles.mainView}>
				<Text style={styles.titleText}>Top 100</Text>
				<Text style={styles.subtitleText}>Channels, Groups, Bots and Stickers</Text>
				<Text style={styles.descriptionText()}>This is a list of the best 100 Telegram channels, groups, bots and stickers in our directory ordered by ratings and member count.</Text>
				<Text style={styles.descriptionText(true)}>Tell your community to rate you in this app to get better rankings!</Text>

				<Filters />
			</View>
		);
	}

	function FooterRenderer() {
		return <View />;
	}

	return null;
	// return <VerticalList Header={HeaderRenderer} Footer={FooterRenderer} data={entriesData} loading={loading} refreshFunc={refreshData} />;
}
