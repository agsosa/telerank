import React from 'react';
import { Chip } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';

const stlyes = StyleSheet.create({
	chip: { alignSelf: 'center', margin: 10 },
});

function NoMoreEntries() {
	return (
		<View>
			<Chip icon='folder-alert' style={stlyes.chip}>
				<Text>No more entries in the list.</Text>
			</Chip>
		</View>
	);
}

export default NoMoreEntries;
