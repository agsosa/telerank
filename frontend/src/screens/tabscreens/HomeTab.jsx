import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { List } from 'react-native-paper';
import Stats from '../../components/entries/Stats';
import GlobalSearch from '../../components/entries/GlobalSearch';
import VerticalList from '../../components/entries/VerticalList';
import SectionTitle from '../../components/SectionTitle';
import { getModuleData } from '../../lib/API';
import HorizontalList from '../../components/entries/HorizontalList';
import AddMediaInfoBanner from '../../components/infobanners/AddMediaInfoBanner';
import FeatureInfoBanner from '../../components/infobanners/FeatureInfoBanner';
import Filters from '../../components/entries/Filters';

export default function HomeTab() {
	const navigation = useNavigation();

	function HeaderRenderer() {
		return (
			<View>
				<GlobalSearch />
				<AddMediaInfoBanner navigation={navigation} />
				<SectionTitle text='Recently Added' />
				<HorizontalList apiModule='home' />

				<SectionTitle text='Featured' />
				<FeatureInfoBanner navigation={navigation} />
			</View>
		);
	}

	function FooterRenderer() {
		return (
			<View>
				<FeatureInfoBanner navigation={navigation} />
			</View>
		);
	}

	return <VerticalList Header={HeaderRenderer} Footer={FooterRenderer} apiModule='home' />;
}
