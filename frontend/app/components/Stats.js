import React from "react";
import { Text, StyleSheet } from "react-native";
import { Grid, Col, Row } from "native-base";
import { formattedNumber } from "../lib/Helpers";
import { colors } from "../config/Styles";

export default function Stats() {
	return (
		<Grid style={styles.grid}>
			<Col style={styles.col}>
				<Row style={styles.row}>
					<Text style={styles.row_title}>Canales</Text>
					<Text style={styles.row_number}>{formattedNumber(54123)}</Text>
				</Row>
				<Row style={styles.row}>
					<Text style={styles.row_title}>Grupos</Text>
					<Text style={styles.row_number}>{formattedNumber(54123)}</Text>
				</Row>
				<Row style={styles.row}>
					<Text style={styles.row_title}>En revision</Text>
					<Text style={styles.row_number}>{formattedNumber(54123)}</Text>
				</Row>
			</Col>
			<Col style={styles.col}>
				<Row style={styles.row}>
					<Text style={styles.row_title}>Bots</Text>
					<Text style={styles.row_number}>{formattedNumber(54123)}</Text>
				</Row>
				<Row style={styles.row}>
					<Text style={styles.row_title}>Stickers</Text>
					<Text style={styles.row_number}>{formattedNumber(54123)}</Text>
				</Row>
				<Row style={styles.row}>
					<Text style={styles.row_title}>Eliminados</Text>
					<Text style={styles.row_number}>{formattedNumber(54123)}</Text>
				</Row>
			</Col>
			<Col style={styles.col}>
				<Row style={styles.row}>
					<Text style={styles.row_title}>Ratings</Text>
					<Text style={styles.row_number}>{formattedNumber(54123)}</Text>
				</Row>
				<Row style={styles.row}>
					<Text style={styles.row_title}>Comments</Text>
					<Text style={styles.row_number}>{formattedNumber(54123)}</Text>
				</Row>
				<Row style={styles.row}>
					<Text style={styles.row_title}>Views</Text>
					<Text style={styles.row_number}>{formattedNumber(54123)}</Text>
				</Row>
			</Col>
		</Grid>
	);
}

const styles = StyleSheet.create({
	col: {
		alignContent: "center",
		alignItems: "center",
		borderColor: "gray",
		borderLeftWidth: 1,
		height: "100%",
		justifyContent: "center",
	},
	grid: {
		marginHorizontal: -10,
		marginVertical: 0,
		paddingVertical: 10,
	},
	row: {
		alignContent: "center",
		alignItems: "center",
		flexDirection: "column",
		padding: 5,
	},
	row_number: {
		color: colors.main,
		fontSize: 25,
		fontWeight: "bold",
	},
	row_title: {
		color: "gray",
		fontSize: 15,
	},
});
