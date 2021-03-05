import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { colors } from '../config/Styles';

const styles = StyleSheet.create({
	snackbar: { backgroundColor: colors.tgDarkGray },
});

const APIErrorSnackbar = ({ apiErrorActive, setAPIErrorStatus }) => {
	const onDismissSnackBar = () => setAPIErrorStatus(false);

	return (
		<Snackbar
			visible={apiErrorActive}
			style={styles.snackbar}
			onDismiss={onDismissSnackBar}
			duration={20000}
			action={{
				label: 'OK',
				onPress: () => {
					setAPIErrorStatus(false);
				},
			}}>
			<Text>{`An error occurred while requesting the information. You may see outdated information.
Pull to refresh the screen now or restart the app.`}</Text>
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
