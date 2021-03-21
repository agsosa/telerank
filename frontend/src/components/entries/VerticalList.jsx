import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { Item } from 'native-base';
import { commonStyles } from '../../config/Styles';
import VerticalCard from './VerticalCard';
import LoadingIndicator from '../LoadingIndicator';
import { getModuleData, getModuleInfo } from '../../lib/API';
import NoEntriesFound from './NoEntriesFound';
import NoMoreEntries from './NoMoreEntries';
import Filters from './Filters';
import { useIsMounted } from '../../lib/Helpers';

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

const renderItem = (q) => <VerticalCard item={q.item} />;

function VerticalList({ Header, Footer, useSearchBar, apiModule, useFilters, initialData }) {
	const isMounted = useIsMounted();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(initialData === null);
	const [loadingExtraData, setLoadingExtraData] = useState(false);
	const [page, setPage] = useState(0);
	const [isLastPage, setLastPage] = useState(false);

	const apiModuleInfo = getModuleInfo(apiModule);

	const refreshData = async () => {
		if (!initialData) {
			setLoading(true);
			setData([]);
			setPage(0);
			setLoadingExtraData(false);

			getModuleData(apiModule).then((result) => {
				if (isMounted) {
					setData(result);
					setLoading(false);
				}
			});
		}
	};

	const OnEndReached = async () => {
		if (apiModuleInfo.isPaginated && !loadingExtraData) {
			setLoadingExtraData(true);
			const res = await getModuleData(apiModule, { page: page + 1 }, true);
			if (isMounted) {
				if (res) {
					if (res.length > 0) setData((old) => [...old, ...res]);
					else setLastPage(true);
				}
				setPage(page + 1);
				setLoadingExtraData(false);
			}
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

	const RenderFooter = () => (
		<View>
			{((apiModuleInfo.isPaginated && isLastPage) || !apiModuleInfo.isPaginated) && <NoMoreEntries />}
			{loadingExtraData && <LoadingIndicator />}
			{Footer && <Footer />}
		</View>
	);

	if (loading) return <LoadingIndicator />;

	return (
		<View style={commonStyles.flex}>
			<FlatList
				data={data || initialData}
				initialNumToRender={5}
				keyboardDismissMode='drag'
				keyboardShouldPersistTaps='handled'
				ListEmptyComponent={NoEntriesFound}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
				ListHeaderComponent={RenderHeader}
				ListFooterComponent={RenderFooter}
				onRefresh={refreshData}
				refreshing={loading}
				onEndReachedThreshold={0.8}
				onEndReached={OnEndReached}
			/>
		</View>
	);
}

VerticalList.defaultProps = {
	useSearchBar: false,
	Header: null,
	useFilters: false,
	Footer: null,
	initialData: null,
	apiModule: '',
};

VerticalList.propTypes = {
	useSearchBar: PropTypes.bool,
	Header: PropTypes.func,
	Footer: PropTypes.func,
	apiModule: PropTypes.string,
	useFilters: PropTypes.bool,
	initialData: PropTypes.array,
};

export default VerticalList;
