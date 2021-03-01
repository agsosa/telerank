import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Banner } from 'react-native-paper';
import PropTypes from 'prop-types';
import { colors } from '../config/Styles';

const img = require('../../img/tg.png');

// TODO: Implementar onPress del action

const styles = StyleSheet.create({
	action: { marginRight: 10, marginVertical: '-5%', paddingBottom: 15 },
	banner: { backgroundColor: 'white', borderLeftColor: colors.main, borderLeftWidth: 5, elevation: 1, marginVertical: '2%' },
	content: { marginBottom: '1%', marginTop: '-1%' },
});

export default function InfoBanner({ children }) {
	return (
		<Banner
			visible
			contentStyle={styles.content}
			style={styles.banner}
			actions={[
				{
					label: 'Learn more',
					onPress: () => null,
					style: styles.action,
				},
			]}
			icon={({ size }) => (
				<Image
					source={img}
					style={{
						width: size,
						height: size,
					}}
				/>
			)}>
			{children}
		</Banner>
	);
}

InfoBanner.defaultProps = {
	children: null,
};

InfoBanner.propTypes = {
	children: PropTypes.element,
};
