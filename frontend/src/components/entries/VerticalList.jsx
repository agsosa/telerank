import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { commonStyles } from '../../config/Styles';
import VerticalCard from './VerticalCard';
import LoadingIndicator from '../LoadingIndicator';
import { getModuleData } from '../../lib/API';
import NoEntriesFound from './NoEntriesFound';

export default function VerticalList({ Header, Footer, useSearchBar, apiModule }) {
	const verticalFlatListRef = useRef();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	const refreshData = async () => {
		setLoading(true);
		setData([]);

		await getModuleData(apiModule).then((result) => {
			if (setData) {
				setData(result);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		refreshData();
	}, []);

	useEffect(() => {
		refreshData();
	}, [apiModule]);

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
	const RenderHeader = () => (
		<View>
			{Header && <Header />}

			{useSearchBar && !loading && <Searchbar placeholder='Search...' onChangeText={searchFilterFunction} value={searchValue} />}
		</View>
	);

	const renderFooter = () => <View>{Footer && <Footer />}</View>;
	if (loading || !data || !Array.isArray(data)) return <LoadingIndicator />;

	return (
		<View style={commonStyles.flex}>
			<FlatList
				ref={verticalFlatListRef}
				data={data}
				ListEmptyComponent={NoEntriesFound}
				renderItem={(q) => <VerticalCard item={q.item} />}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={null}
				getItemLayout={(data, index) => ({ length: 200, offset: 200 * index, index })}
				ListHeaderComponent={RenderHeader}
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
