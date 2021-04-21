import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { commonStyles } from 'lib/Styles';
import VerticalCard from 'components/entries/VerticalCard';
import LoadingIndicator from 'components/LoadingIndicator';
import { getModuleData, getModuleInfo } from 'lib/API';
import NoEntriesFound from 'components/entries/NoEntriesFound';
import NoMoreEntries from 'components/entries/NoMoreEntries';
import Filters from 'components/entries/Filters';
import { useIsMounted } from 'lib/Helpers';

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

	return <Searchbar placeholder='Search' value={searchQuery} onChangeText={onChangeSearch} style={{ marginBottom: 10 }} onIconPress={onSearchClick} onEndEditing={onSearchClick} />;
}

const renderItem = (q) => <VerticalCard item={q.item} />;

function VerticalList({ apiModule, payload, initialData, Header, Footer, useSearchBar, useFilters }) {
	const isMounted = useIsMounted();

	const [data, setData] = useState([]); // Data to display with our FlatList
	const [loading, setLoading] = useState(initialData === null); // Fetching/refreshing the initial data?
	const [loadingExtraData, setLoadingExtraData] = useState(false); // True if we are fetching another page of data
	const [page, setPage] = useState(0); // Used if we have a paginated apiModule
	const [isLastPage, setLastPage] = useState(false); // Used to know if a paginated apiModule reached the last page
	const [endReached, setEndReached] = useState(false); // Used to know if we reached the end of the list (useful for non-paginated apiModules)

	const apiModuleInfo = getModuleInfo(apiModule);

	const refreshData = async () => {
		if (!initialData) {
			setLoading(true);
			setData([]);
			setPage(0);
			setLoadingExtraData(false);

			getModuleData(apiModule, payload).then((result) => {
				if (isMounted) {
					setData(result);
					setLoading(false);
				}
			});
		}
	};

	const OnEndReached = async () => {
		if (apiModuleInfo.isPaginated && !loadingExtraData && !isLastPage) {
			setLoadingExtraData(true);
			const res = await getModuleData(apiModule, { ...payload, page: page + 1 }, true);
			if (isMounted) {
				if (res) {
					if (res.length > 0) setData((old) => [...old, ...res]);
					else setLastPage(true);
				}
				setPage(page + 1);
				setLoadingExtraData(false);
			}
		} else setEndReached(true);
	};

	useEffect(() => {
		if (initialData) setData(initialData);
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
			{((apiModuleInfo.isPaginated && isLastPage) || (!apiModuleInfo.isPaginated && endReached)) && <NoMoreEntries />}
			{loadingExtraData && <LoadingIndicator />}
			{Footer && <Footer />}
		</View>
	);

	if (loading) return <LoadingIndicator />;

	return (
		<View style={commonStyles.flex}>
			<FlatList
				data={data}
				initialNumToRender={5}
				keyboardDismissMode='drag'
				keyboardShouldPersistTaps='handled'
				ListEmptyComponent={NoEntriesFound}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
				ListHeaderComponent={RenderHeader}
				scrollEventThrottle={1000}
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
	payload: {},
};

VerticalList.propTypes = {
	useSearchBar: PropTypes.bool,
	Header: PropTypes.func,
	Footer: PropTypes.func,
	apiModule: PropTypes.string.isRequired,
	useFilters: PropTypes.bool,
	initialData: PropTypes.array,
	payload: PropTypes.object,
};

export default VerticalList;
