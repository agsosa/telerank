import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import Stats from '../entries/Stats';
import { getModuleData } from '../../lib/API';

const styles = StyleSheet.create({
	text: { fontSize: 18, top: 5 },
	view: { flexDirection: 'row' },
});

const StatsModal = React.forwardRef((props, ref) => {
	const [visible, setVisible] = React.useState(false);
	const [statsData, setStatsData] = React.useState({});
	const [loading, setLoading] = React.useState(true);

	const refreshData = async () => {
		setLoading(true);
		getModuleData('Stats')
			.then((result) => {
				if (setStatsData) setStatsData(result);
			})
			.catch((reason) => {
				console.log(`getModuleData rejected with reason ${reason}`);
			})
			.then(() => setLoading(false));
	};

	React.useEffect(() => {
		refreshData();
	}, []);

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
					<Text>Statistics</Text>
				</Dialog.Title>
				<Dialog.ScrollArea>
					<Stats data={statsData} loading={loading} />
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
