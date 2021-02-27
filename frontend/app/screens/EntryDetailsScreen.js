import React from "react";
import { View, ScrollView } from "react-native";
import { Image } from "react-native";
import { Right, Badge, Card, CardItem, Thumbnail, Icon, Text, Left, Body } from "native-base";
import { Button } from "react-native-paper";

import Tag from "../components/Tag";
import { formatLanguageCode } from "../lib/Helpers";

export default function EntryDetailsScreen({ route }) {
	const data = route.params;

	/*            <CardItem>
              <Body>
                <Image source={{uri: data.image}} style={{height: 200, width: '100%', flex: 0}}/>
              </Body>
            </CardItem>*/

	return (
		<View style={{ zIndex: 99, top: "-28%", flex: 1, marginBottom: "-30%", marginHorizontal: -5 }}>
			<ScrollView centerContent style={{ height: 50 }} contentContainerStyle={{ alignSelf: "center" }}>
				<Card key={data._id} style={{ width: "90%", flex: 1 }}>
					<CardItem bordered>
						<Left>
							<Thumbnail source={{ uri: data.image }} />
							<Body>
								<Text>{data.username}</Text>
								<Text note>
									{data.type} / {data.category} / {formatLanguageCode(data.language)}
								</Text>
							</Body>
						</Left>

						{data.featured && (
							<Right style={{ zIndex: 5, position: "absolute", right: "-1%", top: "-10%" }}>
								<Badge style={{ flexDirection: "row", backgroundColor: "#FFB400" }}>
									<Icon name="star" style={{ fontSize: 15, color: "#fff", lineHeight: 20 }} />
									<Text style={{ color: "white" }}>Featured</Text>
								</Badge>
							</Right>
						)}
					</CardItem>

					<CardItem bordered style={{ flex: 1, flexDirection: "column" }}>
						<Text style={{ textAlign: "center" }}>{data.title}</Text>
					</CardItem>

					<CardItem bordered>
						<Body>
							<Image source={{ uri: data.image }} style={{ height: 200, width: "100%", flex: 0 }} />
						</Body>
					</CardItem>

					<CardItem boreded style={{ flex: 1, flexDirection: "column" }}>
						<Text style={{ alignSelf: "center", color: "#2196F3", fontSize: 15, fontWeight: "bold" }}>Description</Text>
						<Text style={{ textAlign: "center", margin: 10, paddingTop: 5 }}>{data.description}</Text>
					</CardItem>

					<Button style={{ backgroundColor: "#2196F3", paddingVertical: 3, marginHorizontal: 30, marginVertical: 10 }}>
						<Icon name="paper-plane" style={{ color: "white" }} />
						<Text style={{ color: "white", fontSize: 20 }}>Abrir en Telegram</Text>
					</Button>

					<CardItem bordered style={{ flex: 1, flexDirection: "column" }}>
						<Text note>Date Added: {new Date().toDateString()}</Text>
						<Text note>Last Updated: {new Date().toDateString()}</Text>
					</CardItem>

					<CardItem>
						<Left />
						<Body>
							<View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "center", padding: 0 }}>
								<Tag icon="thumb-up">{data.likes}</Tag>
								<Tag icon="thumb-down">{data.dislikes}</Tag>
							</View>
						</Body>
						<Right />
					</CardItem>

					<CardItem bordered>
						<Left></Left>
						<Body>
							<View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "center", padding: 0 }}>
								<Tag icon="chart-bar">
									<Text>visitas</Text>
								</Tag>
								<Tag icon="account">{data.members}</Tag>
							</View>
						</Body>
						<Right></Right>
					</CardItem>
					<CardItem bordered style={{ textAlign: "center", flex: 1 }}>
						<Text style={{ alignSelf: "center", color: "#2196F3", fontSize: 15, fontWeight: "bold", textAlign: "center" }}>Comments</Text>
					</CardItem>
				</Card>
			</ScrollView>
		</View>
	);
}
