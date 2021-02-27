import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import { colors } from "./../config/Styles";

export default function GlobalSearch() {
	const [searchQuery, setSearchQuery] = useState("");

	const onChangeSearch = (query) => {
		setSearchQuery(query);
	};

	return (
		<View style={styles.mainView}>
			<Text style={styles.titleText}>Discover your next community</Text>
			<Text style={styles.descriptionText}>Search more than 5000 Telegram Channels, Groups, Bots and Stickers.</Text>
			<Searchbar style={styles.searchBar} placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
			<View style={styles.buttonsView}>
				<Button style={styles.buttonBase} color="white" icon="cached" mode="contained" onPress={() => console.log("Pressed")}>
					<Text style={styles.buttonRandomText}>Aleatorio</Text>
				</Button>
				<Button style={[styles.buttonBase, styles.buttonSearch]} color="black" icon="comment-search" mode="contained" onPress={() => console.log("Pressed")}>
					<Text style={styles.buttonSearchText}>Buscar</Text>
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonBase: { marginHorizontal: 10, width: "35%" },
	buttonRandomText: { color: colors.tgDarkGray },
	buttonSearch: { backgroundColor: colors.main },
	buttonSearchText: { color: "white" },
	buttonsView: { flex: 1, flexDirection: "row", justifyContent: "space-evenly", marginTop: 15, marginBottom: 20 },
	descriptionText: { color: "gray", fontSize: 15, padding: 5, textAlign: "center" },
	mainView: {
		alignContent: "center",
		alignItems: "center",
		marginVertical: 3,
	},
	searchBar: { marginTop: 15, width: "90%" },
	titleText: { color: colors.main, fontSize: 24, fontWeight: "bold", paddingTop: 10, textAlign: "center" },
});
