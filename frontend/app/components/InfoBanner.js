import React from "react";
import { Image, View, Text } from "react-native";
import { Banner, Button } from "react-native-paper";
import { colors } from "../config/Styles";

export default function InfoBanner(props) {
	return (
		<Banner
			visible={true}
			contentStyle={{ marginBottom: "1%", marginTop: "-1%" }}
			style={{ marginVertical: "2%", backgroundColor: "white", borderLeftWidth: 5, elevation: 1, borderLeftColor: colors.main }}
			actions={[
				{
					label: "Hide",
					onPress: () => console.log("learn more"),
					style: { marginVertical: "-5%", paddingBottom: 15, marginRight: 10 },
				},
				{
					label: "Learn more",
					onPress: () => console.log("learn more"),
					style: { marginVertical: "-5%", paddingBottom: 15, marginRight: 10 },
				},
			]}
			icon={({ size }) => (
				<Image
					source={require("../../img/tg.png")}
					style={{
						width: size,
						height: size,
					}}
				/>
			)}>
			{props.children}
		</Banner>
	);
}
