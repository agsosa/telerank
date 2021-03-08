import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { commonStyles } from '../../config/Styles';
import VerticalCard from './VerticalCard';
import LoadingIndicator from '../LoadingIndicator';
import { getModuleData } from '../../lib/API';

export default function VerticalList({ Header, Footer, useSearchBar, apiModule }) {
	const verticalFlatListRef = useRef();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	const refreshData = async () => {
		setLoading(true);
		setData([]);

		await getModuleData(apiModule)
			.then((result) => {
				if (setData) setData(result);
			})
			.catch((reason) => {
				console.log(`getModuleData rejected with reason ${reason}`);
			});

		setLoading(false);
	};

	useEffect(() => {
		refreshData();
	}, []);

	/*
	 * Search & Filter
	 */
	const applySearchValue = () => {
		if (data && data.length > 0) {
			// TODO: Hacer. Quizas cuando el usuario busque pasar data a dataLocal
			/* const newData = data.filter((item) => {
				const itemData = `${item.username.toUpperCase()} ${item.title.toUpperCase()}`;
				const textData = searchValue.toUpperCase();

				return itemData.indexOf(textData) > -1;
			});

			if (newData !== data) setData(newData); */
		}
	};

	const searchFilterFunction = (text) => {
		setSearchValue(text);
		applySearchValue();
	};

	/*
	 *	Renders
	 */
	const renderHeader = () => (
		<View>
			{Header && <Header />}

			{useSearchBar && !loading && <Searchbar placeholder='Search...' onChangeText={searchFilterFunction} value={searchValue} />}
		</View>
	);

	const renderFooter = () => <View>{Footer && <Footer />}</View>;

	if (loading || !data || !Array.isArray(data) || data.length <= 0) return <LoadingIndicator />;

	return (
		<View style={commonStyles.flex}>
			<FlatList
				ref={verticalFlatListRef}
				data={data}
				renderItem={(q) => <VerticalCard item={q.item} />}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={null}
				ListHeaderComponent={renderHeader}
				ListFooterComponent={renderFooter}
				onRefresh={refreshData}
				refreshing={loading}
			/>
		</View>
	);
}

VerticalList.defaultProps = {
	useSearchBar: false,
	Header: null,
	Footer: null,
};

VerticalList.propTypes = {
	useSearchBar: PropTypes.bool,
	Header: PropTypes.func,
	Footer: PropTypes.func,
	apiModule: PropTypes.string.isRequired,
};
