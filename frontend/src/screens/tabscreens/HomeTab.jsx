import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Stats from '../../components/entries/Stats';
import GlobalSearch from '../../components/entries/GlobalSearch';
import VerticalList from '../../components/entries/VerticalList';
import SectionTitle from '../../components/SectionTitle';
import { getModuleData } from '../../lib/API';
import HorizontalList from '../../components/entries/HorizontalList';
import AddMediaInfoBanner from '../../components/infobanners/AddMediaInfoBanner';
import FeatureInfoBanner from '../../components/infobanners/FeatureInfoBanner';

export default function HomeTab() {
	const navigation = useNavigation();

	function HeaderRenderer() {
		return (
			<View>
				<GlobalSearch />
				<SectionTitle text='Recently Added' />
				<HorizontalList apiModule='home' />
				<AddMediaInfoBanner navigation={navigation} />
				<SectionTitle text='Featured' />
			</View>
		);
	}

	function FooterRenderer() {
		return (
			<View>
				<FeatureInfoBanner navigation={navigation} />
				<SectionTitle text='Estadísticas' />
				<Stats />
			</View>
		);
	}

	return <VerticalList Header={HeaderRenderer} Footer={FooterRenderer} apiModule='home' />;
}
