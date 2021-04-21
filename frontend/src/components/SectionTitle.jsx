/* eslint react-native/no-unused-styles: 0 */

import React from 'react';
import { View, StyleSheet, Text, ViewPropTypes } from 'react-native';
import { Headline } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { colors } from 'lib/Styles';

const styles = (size, color) =>
	StyleSheet.create({
		headline: { alignSelf: 'center', color, fontSize: size, fontWeight: 'bold' },
		view: {
			padding: 2,
		},
	});

export default function SectionTitle({ text, size, color, style }) {
	return (
		<View style={styles().view}>
			<Headline style={[styles(size, color).headline, style]}>
				<Text>{text || ''}</Text>
			</Headline>
		</View>
	);
}

SectionTitle.defaultProps = { size: 20, color: colors.pink, style: {} };
SectionTitle.propTypes = { text: PropTypes.string.isRequired, size: PropTypes.number, color: PropTypes.string, style: ViewPropTypes.style };
