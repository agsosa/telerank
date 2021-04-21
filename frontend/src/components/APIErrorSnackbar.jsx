import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { colors } from 'lib/Styles';

const styles = StyleSheet.create({
	snackbar: { backgroundColor: colors.tgDarkGray },
});

const APIErrorSnackbar = ({ apiErrorActive, setAPIErrorStatus }) => {
	const onDismissSnackBar = () => setAPIErrorStatus(false);
	const { t } = useTranslation();

	return (
		<Snackbar
			visible={apiErrorActive}
			style={styles.snackbar}
			onDismiss={onDismissSnackBar}
			duration={30000}
			action={{
				label: 'OK',
				onPress: () => {
					setAPIErrorStatus(false);
				},
			}}>
			<Text>{t('errorInfoRequest')}</Text>
		</Snackbar>
	);
};

APIErrorSnackbar.propTypes = {
	apiErrorActive: PropTypes.bool.isRequired,
	setAPIErrorStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	apiErrorActive: state.apiErrorActive,
});

const mapDispatchToProps = (dispatch) => ({
	setAPIErrorStatus: dispatch.apiErrorActive.setAPIErrorStatus,
});

export default connect(mapStateToProps, mapDispatchToProps)(APIErrorSnackbar);
