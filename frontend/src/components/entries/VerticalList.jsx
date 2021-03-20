import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { commonStyles } from '../../config/Styles';
import VerticalCard from './VerticalCard';
import LoadingIndicator from '../LoadingIndicator';
import { getModuleData } from '../../lib/API';
import NoEntriesFound from './NoEntriesFound';
import NoMoreEntries from './NoMoreEntries';
import Filters from './Filters';

function CustomSearchBar() {
	const [searchQuery, setSearchQuery] = useState('');

	const applySearchValue = () => {
		/* if (data && data.length > 0) {
			// TODO: Hacer. Quizas cuando el usuario busque pasar data a dataLocal
			 const newData = data.filter((item) => {
					const itemData = `${item.username.toUpperCase()} ${item.title.toUpperCase()}`;
					const textData = searchValue.toUpperCase();
	
					return itemData.indexOf(textData) > -1;
				});
	
				if (newData !== data) setData(newData); 
		} */
	};

	const onChangeSearch = (value) => {
		setSearchQuery(value);
	};

	const onSearchClick = () => {
		console.log(searchQuery);
	};

	// eslint-disable-next-line
	return <Searchbar placeholder='Search' value={searchQuery} onChangeText={onChangeSearch} style={{ marginBottom: 10 }} onIconPress={onSearchClick} onEndEditing={onSearchClick} />;
}

function VerticalList({ Header, Footer, useSearchBar, apiModule, useFilters, useData }) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(useData === null);

	const refreshData = async () => {
		if (!useData) {
			setLoading(true);
			setData([]);

			await getModuleData(apiModule).then((result) => {
				if (setData) {
					setData(result);
					setLoading(false);
				}
			});
		}
	};

	useEffect(() => {
		refreshData();
	}, []);

	/*
	 *	Renders
	 */

	const RenderHeader = () => (
		<View>
			{Header && <Header />}

			{useSearchBar && !loading && <CustomSearchBar />}
			{useFilters && !loading && <Filters />}
		</View>
	);

	const renderFooter = () => (
		<View>
			{data && data.length > 0 && <NoMoreEntries />}
			{Footer && <Footer />}
		</View>
	);
	if (loading) return <LoadingIndicator />;

	return (
		<View style={commonStyles.flex}>
			<FlatList
				data={data || useData}
				keyboardDismissMode='drag'
				keyboardShouldPersistTaps='handled'
				ListEmptyComponent={NoEntriesFound}
				renderItem={(q) => <VerticalCard item={q.item} />}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={null}
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
	useFilters: false,
	Footer: null,
	useData: null,
	apiModule: '',
};

VerticalList.propTypes = {
	useSearchBar: PropTypes.bool,
	Header: PropTypes.func,
	Footer: PropTypes.func,
	apiModule: PropTypes.string,
	useFilters: PropTypes.bool,
	useData: PropTypes.array,
};

export default VerticalList;
