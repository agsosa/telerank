import React from 'react';
import { Chip } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const stlyes = StyleSheet.create({
	chip: { alignSelf: 'center', margin: 10 },
});

function NoEntriesFound() {
	const { t } = useTranslation();
	return (
		<View>
			<Chip icon='folder-alert' style={stlyes.chip}>
				<Text>{t('noEntriesFound')}</Text>
			</Chip>
		</View>
	);
}

export default NoEntriesFound;
