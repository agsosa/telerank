import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { EnumLanguage } from 'telerank-shared/lib/Language';
import { getTranslatedLanguage } from 'lib/locale/Locale';

const styles = StyleSheet.create({
	text: { fontSize: 18, top: 5 },
	view: { flexDirection: 'row' },
});

const LanguageModal = React.forwardRef((props, ref) => {
	const { t, i18n } = useTranslation();
	const [visible, setVisible] = React.useState(false);
	const [lang, setLang] = React.useState(i18n.language);

	const show = () => setVisible(true);

	const hide = () => {
		// Apply language

		i18n.changeLanguage(lang);
		setVisible(false);
	};

	// Functions to show/hide from parent component using ref
	React.useImperativeHandle(ref, () => ({
		show() {
			show();
		},
		hide() {
			hide();
		},
	}));

	function handleLanguageChange(newValue) {
		setLang(newValue);
	}

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hide}>
				<Dialog.Title>
					<Text>{t('chooseLanguage')}</Text>
				</Dialog.Title>
				<Dialog.Content>
					<RadioButton.Group onValueChange={handleLanguageChange} value={lang}>
						{Object.values(EnumLanguage).map((q) => (
							<View key={q} style={styles.view}>
								<RadioButton value={q} />
								<Text style={styles.text}>{getTranslatedLanguage(q)}</Text>
							</View>
						))}
					</RadioButton.Group>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={hide}>
						<Text>{t('done')}</Text>
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
});

export default LanguageModal;
