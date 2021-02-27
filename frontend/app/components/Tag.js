import * as React from "react";
import { Chip } from "react-native-paper";
import { commonStyles } from "../config/Styles";
import { formattedNumber, isNumber } from "../lib/Helpers";

export default function Tag(props) {
	return (
		<Chip icon={props.icon} style={commonStyles.transparentBg}>
			{isNumber(props.children) ? formattedNumber(props.children) : props.children}
		</Chip>
	);
}
