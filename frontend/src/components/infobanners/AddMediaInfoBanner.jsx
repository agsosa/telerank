import React from 'react';
import { Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import InfoBanner from './InfoBanner';

const AddMediaInfoBanner = ({ hideKey, navigation }) => {
	const { t } = useTranslation();
	return (
		<InfoBanner hideKey={hideKey} callToAction={() => navigation.navigate('AddMedia')}>
			<Text>{t('infoBanner.addMediaBanner')}</Text>
		</InfoBanner>
	);
};

AddMediaInfoBanner.defaultProps = {
	hideKey: 'add_hint',
};

AddMediaInfoBanner.propTypes = {
	navigation: PropTypes.object.isRequired,
	hideKey: PropTypes.string,
};

export default AddMediaInfoBanner;
