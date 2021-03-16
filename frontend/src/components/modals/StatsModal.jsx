import * as React from 'react';
import { Text } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Stats from '../entries/Stats';

const StatsModal = React.forwardRef((props, ref) => {
	const [visible, setVisible] = React.useState(false);

	const show = () => {
		setVisible(true);
	};

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
					<Text>Statistics</Text>
				</Dialog.Title>
				<Dialog.ScrollArea>
					<Stats />
				</Dialog.ScrollArea>
				<Dialog.Actions>
					<Button onPress={hide}>
						<Text>Done</Text>
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
});

export default StatsModal;
