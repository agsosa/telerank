import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Headline } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { colors } from '../config/Styles';

const styles = StyleSheet.create({
	headline: { alignSelf: 'center', color: colors.pink, fontSize: 18, fontWeight: 'bold' },
	view: {
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		borderBottomWidth: 3,
		borderColor: colors.pink,
		marginBottom: 10,
		marginHorizontal: '25%',
		marginTop: 5,
		padding: 2,
	},
});

export default function SectionTitle({ text }) {
	return (
		<View style={styles.view}>
			<Headline style={styles.headline}>
				<Text>{text || ''}</Text>
			</Headline>
		</View>
	);
}

SectionTitle.propTypes = { text: PropTypes.string.isRequired };
