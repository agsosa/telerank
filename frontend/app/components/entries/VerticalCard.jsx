import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Badge, Right, Card, CardItem, Thumbnail, Text, Icon, Left, Body } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Tag from "../Tag";
import { formatLanguageCode } from "../../lib/Helpers";
import { commonStyles, colors } from "../../config/Styles";

const styles = StyleSheet.create( {
	featuredBG: { backgroundColor: colors.featuredLight },
	membersTag: { alignSelf: "flex-start" },
	statsView: {
		flex: 1,
		flexDirection: "row",
		marginTop: 5,
		flexWrap: "wrap",
		alignItems: "center",
		padding: 10,
	},
	
})

export default function VerticalCard({item}) {
	const navigation = useNavigation();
	return (
		<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Details", item)}>
			<Card style={[commonStyles.flex, item.featured && { borderColor: "#FFB400", borderLeftWidth: 5 }]}>
				<CardItem style={item.featured && styles.featuredBG}>
					<Left>
						<Thumbnail source={{ uri: item.image }} />
						<Body>
							<Text>{item.username}</Text>
							<Text note>
								{item.type} / {item.category} / {formatLanguageCode(item.language)}
							</Text>
						</Body>
					</Left>

					{item.featured && (
						<Right style={{ zIndex: 5, position: "absolute", right: "0%", top: "-10%" }}>
							<Badge style={{ flexDirection: "row", backgroundColor: "#FFB400" }}>
								<Icon name="star" style={{ fontSize: 15, color: "#fff", lineHeight: 20 }} />
								<Text style={{ color: "white" }}>Featured</Text>
							</Badge>
						</Right>
					)}
				</CardItem>
				<CardItem style={item.featured && styles.featuredBG}>
					<Body style={{}}>
						<Text>{item.title}</Text>

						<View
							style={styles.statsView}>
							<Tag icon="thumb-up">{item.likes}</Tag>
							<Tag icon="thumb-down">{item.dislikes}</Tag>
							<Tag style={styles.membersTag} icon="account">
								{item.members}
							</Tag>
						</View>
					</Body>
				</CardItem>
			</Card>
		</TouchableOpacity>
	);
}
