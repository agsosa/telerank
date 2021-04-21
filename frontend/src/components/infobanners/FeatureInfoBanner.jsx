import React from 'react';
import { Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import InfoBanner from 'components/infobanners/InfoBanner';

const FeatureInfoBanner = ({ hideKey, navigation }) => {
	const { t } = useTranslation();

	return (
		<InfoBanner hideKey={hideKey} callToAction={() => navigation.navigate('Promote')}>
			<Text>{t('infoBanner.featureBanner')}</Text>
		</InfoBanner>
	);
};

FeatureInfoBanner.defaultProps = {
	hideKey: 'feature_hint',
};

FeatureInfoBanner.propTypes = {
	navigation: PropTypes.object.isRequired,
	hideKey: PropTypes.string,
};

export default FeatureInfoBanner;
