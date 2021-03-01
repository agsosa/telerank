import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet , View, FlatList, ActivityIndicator } from 'react-native';

import { Searchbar } from 'react-native-paper';
import { commonStyles, colors } from '../../config/Styles';
import VerticalCard from './VerticalCard';

const styles = StyleSheet.create({
	loadingView: { alignItems: 'center', flex: 1, justifyContent: 'center' },
})

export default function VerticalList({apiURL, Header, searchBar, Footer}) {
	const [data, setData] = useState([]);
	// const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [auxData, setAuxData] = useState([]);

	const verticalFlatListRef = useRef();

	async function fetchData() {
		const url = apiURL;

		setLoading(true);

		fetch(url)
			.then((response) => response.json())
			.then((res) => {
				setData(res);
				setLoading(false);
				setAuxData(res);
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

	function renderHeader() {
		return (
			<View>
				{Header && <Header />}

				{searchBar && (
					<Searchbar
						placeholder='Search...'
						onChangeText={searchFilterFunction}
						value={searchValue}
					/>
				)}
			</View>
		);
	}

	function renderFooter() {
		return <View>{Footer && <Footer />}</View>;
	}

	if (loading) {
		return (
			<View style={styles.loadingView}>
				<ActivityIndicator size='large' color={colors.main} />
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
				ListHeaderComponent={renderHeader()}
				ListFooterComponent={renderFooter()}
				onRefresh={() => fetchData()}
				refreshing={loading}
			/>
		</View>
	);
}
