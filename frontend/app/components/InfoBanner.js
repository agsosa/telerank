import React from "react";
import { Image, StyleSheet } from "react-native";
import { Banner } from "react-native-paper";
import { colors } from "../config/Styles";

// TODO: Implementar onPress del action

export default function InfoBanner(props) {
	return (
		<Banner
			visible={true}
			contentStyle={styles.content}
			style={styles.banner}
			actions={[
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

const styles = StyleSheet.create({
	banner: { backgroundColor: "white", borderLeftColor: colors.main, borderLeftWidth: 5, elevation: 1, marginVertical: "2%" },
	content: { marginBottom: "1%", marginTop: "-1%" },
});
