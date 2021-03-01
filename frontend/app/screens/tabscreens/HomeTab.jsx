import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import Stats from '../../components/Stats';
import GlobalSearch from '../../components/GlobalSearch';
import VerticalList from '../../components/media/VerticalList';
import SectionTitle from '../../components/SectionTitle';
import InfoBanner from '../../components/InfoBanner';

export default function HomeTab() {
	function HeaderRenderer() {
		return (
			<View>
				<GlobalSearch />

				<InfoBanner>
					<Text>Agrega tu canal, grupo, bot o sticker de Telegram al directorio gratis!</Text>
				</InfoBanner>

				<SectionTitle text='Recently Added' />

				<SectionTitle text='Featured List' />
			</View>
		);
	}

	function FooterRenderer() {
		return (
			<View>
				<InfoBanner>
					<Text>Do you want to feature your Telegram Channel, Group or Bot here?</Text>
				</InfoBanner>
				<SectionTitle text='Estadísticas' />
				<Stats />
			</View>
		);
	}

	return <VerticalList searchBar={false} Header={HeaderRenderer} Footer={FooterRenderer} apiURL='http://f1741455bdf0.ngrok.io/api/entries?page=0&limit=5' />;
}
