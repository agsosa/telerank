import React from 'react';
import { Text } from 'react-native';
import { PropTypes } from 'prop-types';
import InfoBanner from './InfoBanner';

const AddMediaInfoBanner = ({ hideKey, navigation }) => (
	<InfoBanner hideKey={hideKey} callToAction={() => navigation.navigate('AddMedia')}>
		<Text>Agrega tu canal, grupo, bot o sticker de Telegram al directorio gratis!</Text>
	</InfoBanner>
);

AddMediaInfoBanner.defaultProps = {
	hideKey: 'add_hint',
};

AddMediaInfoBanner.propTypes = {
	navigation: PropTypes.object.isRequired,
	hideKey: PropTypes.string,
};

export default AddMediaInfoBanner;
