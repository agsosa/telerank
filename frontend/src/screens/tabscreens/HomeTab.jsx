import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalSearch from '../../components/entries/GlobalSearch';
import VerticalList from '../../components/entries/VerticalList';
import SectionTitle from '../../components/SectionTitle';
import HorizontalList from '../../components/entries/HorizontalList';
import AddMediaInfoBanner from '../../components/infobanners/AddMediaInfoBanner';
import FeatureInfoBanner from '../../components/infobanners/FeatureInfoBanner';

export default function HomeTab() {
	const navigation = useNavigation();

	function HeaderRenderer() {
		return (
			<View>
				<GlobalSearch />
				<AddMediaInfoBanner navigation={navigation} />
				<SectionTitle text='Recently Added' />
				<HorizontalList apiModule='featured' />

				<SectionTitle text='Featured' />
				<FeatureInfoBanner navigation={navigation} />
			</View>
		);
	}

	return <VerticalList Header={HeaderRenderer} apiModule='featured' />;
}
