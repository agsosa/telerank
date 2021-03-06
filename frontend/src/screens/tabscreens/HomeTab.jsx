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
			<View>
				<GlobalSearch />
				<AddMediaInfoBanner navigation={navigation} />
				<SectionTitle text='Recently Added' />
				<HorizontalList data={entriesData} loading={loading} />
				<SectionTitle text='Featured List' />
			</View>
		);
	}

	function FooterRenderer() {
		return (
			<View>
				<FeatureInfoBanner navigation={navigation} />
				<SectionTitle text='Estadísticas' />
				<Stats data={statsData} loading={loading} />
			</View>
		);
	}

	return <VerticalList Header={HeaderRenderer} Footer={FooterRenderer} data={entriesData} loading={loading} refreshFunc={refreshData} />;
}
