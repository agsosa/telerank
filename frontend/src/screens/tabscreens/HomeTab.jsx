import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Stats from '../../components/Stats';
import GlobalSearch from '../../components/GlobalSearch';
import VerticalList from '../../components/entries/VerticalList';
import SectionTitle from '../../components/SectionTitle';
import InfoBanner from '../../components/InfoBanner';
import { getModuleData } from '../../lib/API';
import HorizontalList from '../../components/entries/HorizontalList';

export default function HomeTab() {
	const [statsData, setStatsData] = useState({});
	const [entriesData, setEntriesData] = useState([]);
	const [loading, setLoading] = useState(true);

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
				<InfoBanner hideKey='add_hint'>
					<Text>Agrega tu canal, grupo, bot o sticker de Telegram al directorio gratis!</Text>
				</InfoBanner>
				<SectionTitle text='Recently Added' />
				<HorizontalList data={entriesData} loading={loading} />
				<SectionTitle text='Featured List' />
			</View>
		);
	}

	function FooterRenderer() {
		return (
			<View>
				<InfoBanner hideKey='feature_hint'>
					<Text>Do you want to feature your Telegram Channel, Group or Bot here?</Text>
				</InfoBanner>
				<SectionTitle text='Estadísticas' />
				<Stats data={statsData} loading={loading} />
			</View>
		);
	}

	return <VerticalList Header={HeaderRenderer} Footer={FooterRenderer} data={entriesData} loading={loading} refreshFunc={refreshData} />;
}
