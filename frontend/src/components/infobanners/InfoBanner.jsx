import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Banner } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const img = require('img/tg.png');

const styles = StyleSheet.create({
	action: { marginRight: 10, marginVertical: '-5%', paddingBottom: 15 },
	banner: { backgroundColor: 'white', elevation: 1, marginVertical: 10 },
	content: { marginBottom: '1%', marginTop: '-1%' },
});

const InfoBanner = ({ children, hiddenComponentKeys, hideKey, addHiddenComponentKey, callToAction }) => {
	const { t } = useTranslation();

	return (
		<Banner
			visible={!(hideKey && hiddenComponentKeys.includes(hideKey))}
			contentStyle={styles.content}
			style={styles.banner}
			actions={[
				{
					label: t('infoBanner.hide'),
					onPress: () => hideKey && addHiddenComponentKey(hideKey),
					style: styles.action,
				},
				{
					label: t('infoBanner.learnMore'),
					onPress: () => {
						if (callToAction) callToAction();
					},
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
};

InfoBanner.defaultProps = {
	children: null,
	hideKey: null,
	callToAction: null,
};

InfoBanner.propTypes = {
	children: PropTypes.element,
	hiddenComponentKeys: PropTypes.array.isRequired,
	hideKey: PropTypes.string,
	addHiddenComponentKey: PropTypes.func.isRequired,
	callToAction: PropTypes.func,
};

const mapStateToProps = (state) => ({
	hiddenComponentKeys: state.settings.hiddenComponentKeys,
});

const mapDispatchToProps = (dispatch) => ({
	addHiddenComponentKey: dispatch.settings.addHiddenComponentKey,
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoBanner);
