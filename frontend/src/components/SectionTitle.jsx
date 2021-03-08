import React from 'react';
import { View, StyleSheet, Text, ViewPropTypes } from 'react-native';
import { Headline } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { colors } from '../config/Styles';

const styles = StyleSheet.create({
	headline: { alignSelf: 'center', color: colors.pink, fontSize: 20, fontWeight: 'bold' },
	view: {
		padding: 2,
	},
});

export default function SectionTitle({ text, style }) {
	return (
		<View style={styles.view}>
			<Headline style={[styles.headline, style]}>
				<Text>{text || ''}</Text>
			</Headline>
		</View>
	);
}

SectionTitle.defaultProps = { style: {} };
SectionTitle.propTypes = { text: PropTypes.string.isRequired, style: ViewPropTypes.style };
