import React from "react";
import { View, StyleSheet } from "react-native";
import { Tabs, TabScreen } from "react-native-paper-tabs";

import HomeTab from "./tabscreens/HomeTab";

export default function MainScreen() {
	return (
		<View style={styles.view}>
			<Tabs iconPosition="leading" style={styles.tabs} mode="scrollable" showLeadingSpace={true}>
				<TabScreen label="Inicio" icon="home">
					<HomeTab style={{ flex: 1 }} />
				</TabScreen>
				<TabScreen label="Top 100" icon="crown">
					<View />
				</TabScreen>
				<TabScreen label="Canales" icon="bullhorn">
					<View />
				</TabScreen>
				<TabScreen label="Grupos" icon="forum">
					<View />
				</TabScreen>
				<TabScreen label="Bots" icon="robot">
					<View />
				</TabScreen>
				<TabScreen label="Stickers" icon="sticker">
					<View />
				</TabScreen>
			</Tabs>
		</View>
	);
}

const styles = StyleSheet.create({
	tabs: { backgroundColor: "white", elevation: 5, marginTop: 5 },
	view: { flex: 1 },
});
