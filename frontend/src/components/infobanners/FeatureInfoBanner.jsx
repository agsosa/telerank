import React from 'react';
import { Text } from 'react-native';
import { PropTypes } from 'prop-types';
import InfoBanner from './InfoBanner';

const FeatureInfoBanner = ({ hideKey, navigation }) => (
	<InfoBanner hideKey={hideKey} callToAction={() => navigation.navigate('Promote')}>
		<Text>Do you want to feature your Telegram Channel, Group or Bot here?</Text>
	</InfoBanner>
);

FeatureInfoBanner.defaultProps = {
	hideKey: 'feature_hint',
};

FeatureInfoBanner.propTypes = {
	navigation: PropTypes.object.isRequired,
	hideKey: PropTypes.string,
};

export default FeatureInfoBanner;
