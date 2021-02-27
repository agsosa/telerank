import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { commonStyles } from '../../config/Styles';
import VerticalCard from './VerticalCard';

export default function VerticalList(props) {
	const [data, setData] = useState([]);
	// const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [auxData, setAuxData] = useState([]);

	const verticalFlatListRef = useRef();
	props.verticalListFunctions.scrollToBottom = scrollToBottom;

	async function fetchData() {
		const url = props.api_url;

		setLoading(true);

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setLoading(false);
				setAuxData(data);
			})
			.catch((error) => {
				setLoading(false);
			});
	}

	useEffect(() => {
		fetchData();
	}, []);

	const searchFilterFunction = (text) => {
		setSearchValue(text);

		const newData = auxData.filter((item) => {
			const itemData = `${item.username.toUpperCase()} ${item.title.toUpperCase()}`;
			const textData = text.toUpperCase();

			return itemData.indexOf(textData) > -1;
		});

		setData(newData);
	};

	function renderLocalHeader() {
		return (
			<View>
				{props.header && <props.header />}

				{props.searchbar && (
					<Searchbar
						placeholder='Search...'
						// lightTheme
						// round
						onChangeText={searchFilterFunction}
						// autoCorrect={false}
						value={searchValue}
					/>
				)}
			</View>
		);
	}

	function renderLocalFooter() {
		return <View>{props.footer && <props.footer />}</View>;
	}

	function scrollToBottom() {
		verticalFlatListRef?.current?.scrollToEnd();
	}

	if (loading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size='large' color='#2196F3' />
			</View>
		);
	}
	return (
		<View style={commonStyles.flex}>
			<FlatList
				ref={verticalFlatListRef}
				data={data}
				renderItem={(q) => <VerticalCard item={q.item} />}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={null}
				ListHeaderComponent={renderLocalHeader()}
				ListFooterComponent={renderLocalFooter()}
				onRefresh={() => fetchData()}
				refreshing={loading}
			/>
		</View>
	);
}
