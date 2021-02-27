import * as React from "react";
import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { formattedNumber, isNumber } from "../lib/Helpers";

export default function Tag(props) {
	return (
		<Chip icon={props.icon} style={styles.chip}>
			{isNumber(props.children) ? formattedNumber(props.children) : props.children}
		</Chip>
	);
}

const styles = StyleSheet.create({
	chip: { backgroundColor: "rgba(0, 0, 0, 0)" },
});
