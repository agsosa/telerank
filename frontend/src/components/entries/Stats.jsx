import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Grid, Col, Row } from 'native-base';
import { formattedNumber, useIsMounted } from '../../lib/Helpers';
import { colors } from '../../config/Styles';
import LoadingIndicator from '../LoadingIndicator';
import { getModuleData } from '../../lib/API';

const styles = StyleSheet.create({
	col: {
		alignContent: 'center',
		alignItems: 'center',
		borderColor: 'gray',
		borderLeftWidth: 0,
		borderRightWidth: 0,
		height: '100%',
		justifyContent: 'center',
	},
	grid: {
		marginBottom: 5,
		marginHorizontal: -10,
		paddingVertical: 10,
	},
	row: {
		alignContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		padding: 5,
	},
	row_number: {
		color: colors.main,
		fontSize: 25,
		fontWeight: 'bold',
	},
	row_title: {
		color: 'gray',
		fontSize: 15,
	},
	text: { marginTop: 5, padding: 5, textAlign: 'center' },
});

export default function Stats() {
	const isMounted = useIsMounted();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	const refreshData = async () => {
		setLoading(true);

		await getModuleData('Stats').then((result) => {
			if (isMounted) {
				setData(result);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		refreshData();
	}, []);

	if (loading || !data) return <LoadingIndicator />;

	return (
		<ScrollView>
			<Text style={styles.text}>{`We have ${data.channels + data.groups + data.bots + data.stickers} channels, groups, bots and stickers added to our directory.`}</Text>
			<Grid style={styles.grid}>
				<Col style={styles.col}>
					<Row style={styles.row}>
						<Text style={styles.row_title}>Canales</Text>
						<Text style={styles.row_number}>{formattedNumber(data.channels)}</Text>
					</Row>
					<Row style={styles.row}>
						<Text style={styles.row_title}>Grupos</Text>
						<Text style={styles.row_number}>{formattedNumber(data.groups)}</Text>
					</Row>
					<Row style={styles.row}>
						<Text style={styles.row_title}>En revision</Text>
						<Text style={styles.row_number}>{formattedNumber(data.pending)}</Text>
					</Row>
				</Col>
				<Col style={styles.col}>
					<Row style={styles.row}>
						<Text style={styles.row_title}>Bots</Text>
						<Text style={styles.row_number}>{formattedNumber(data.bots)}</Text>
					</Row>
					<Row style={styles.row}>
						<Text style={styles.row_title}>Stickers</Text>
						<Text style={styles.row_number}>{formattedNumber(data.stickers)}</Text>
					</Row>
					<Row style={styles.row}>
						<Text style={styles.row_title}>Eliminados</Text>
						<Text style={styles.row_number}>{formattedNumber(data.removed)}</Text>
					</Row>
				</Col>
				<Col style={styles.col}>
					<Row style={styles.row}>
						<Text style={styles.row_title}>Members</Text>
						<Text style={styles.row_number}>{formattedNumber(data.members)}</Text>
					</Row>
					<Row style={styles.row}>
						<Text style={styles.row_title}>Views</Text>
						<Text style={styles.row_number}>{formattedNumber(data.views)}</Text>
					</Row>
					<Row style={styles.row}>
						<Text style={styles.row_title}>Ratings</Text>
						<Text style={styles.row_number}>{formattedNumber(data.ratings)}</Text>
					</Row>
				</Col>
			</Grid>
		</ScrollView>
	);
}
