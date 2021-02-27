import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Headline } from "react-native-paper";
import { colors } from "../config/Styles";

export default function SectionTitle(props) {
	return (
		<View style={styles.view}>
			<Headline style={styles.headline}>
				<Text>{props.text ? props.text : ""}</Text>
			</Headline>
		</View>
	);
}

const styles = StyleSheet.create({
	headline: { alignSelf: "center", color: colors.pink, fontSize: 18, fontWeight: "bold" },
	view: {
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		borderBottomWidth: 3,
		borderColor: colors.pink,
		marginHorizontal: "25%",
		marginVertical: 10,
		padding: 2,
	},
});
