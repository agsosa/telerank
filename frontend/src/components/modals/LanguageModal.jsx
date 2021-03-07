import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Languages } from '../../config/Locale';

const styles = StyleSheet.create({
	text: { fontSize: 18, top: 5 },
	view: { flexDirection: 'row' },
});

const LanguageModal = React.forwardRef(({ language, setLanguage }, ref) => {
	const [visible, setVisible] = React.useState(false);

	const show = () => setVisible(true);

	const hide = () => setVisible(false);

	React.useImperativeHandle(ref, () => ({
		show() {
			show();
		},
		hide() {
			hide();
		},
	}));

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hide}>
				<Dialog.Title>
					<Text>Choose app language</Text>
				</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group onValueChange={(newValue) => setLanguage && setLanguage(newValue)} value={language}>
						{Languages.map((q) => (
							<View key={q.code} style={styles.view}>
								<RadioButton value={q.code} />
								<Text style={styles.text}>{q.displayStr}</Text>
							</View>
						))}
					</RadioButton.Group>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={hide}>
						<Text>Done</Text>
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
});

LanguageModal.defaultProps = {
	language: 'en',
	setLanguage: null,
};

LanguageModal.propTypes = {
	language: PropTypes.string,
	setLanguage: PropTypes.func,
};

const mapStateToProps = (state) => ({
	language: state.settings.language,
});

const mapDispatchToProps = (dispatch) => ({
	setLanguage: dispatch.settings.setLanguage,
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(LanguageModal);
