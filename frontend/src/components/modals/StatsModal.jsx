import * as React from 'react';
import { Text } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Stats from '../entries/Stats';

const StatsModal = React.forwardRef((props, ref) => {
	const [visible, setVisible] = React.useState(false);
	const { t } = useTranslation();

	const show = () => {
		setVisible(true);
	};

	const hide = () => setVisible(false);

	// Functions to show/hide from parent component using ref
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
					<Text>{t('drawer.statistics')}</Text>
				</Dialog.Title>
				<Dialog.ScrollArea>
					<Stats />
				</Dialog.ScrollArea>
				<Dialog.Actions>
					<Button onPress={hide}>
						<Text>{t('done')}</Text>
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
});

export default StatsModal;
