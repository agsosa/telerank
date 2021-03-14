import React from 'react';
import { Chip } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';

const stlyes = StyleSheet.create({
	chip: { alignSelf: 'center', margin: 10 },
});

function NoEntriesFound() {
	return (
		<View>
			<Chip icon='folder-alert' style={stlyes.chip}>
				<Text>No entries found. Swipe down to refresh.</Text>
			</Chip>
		</View>
	);
}

export default NoEntriesFound;
