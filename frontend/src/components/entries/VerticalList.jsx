import React, { useState, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { commonStyles } from '../../config/Styles';
import VerticalCard from './VerticalCard';
import LoadingIndicator from '../LoadingIndicator';

export default function VerticalList({ Header, Footer, useSearchBar, refreshFunc, data, loading }) {
	const verticalFlatListRef = useRef();
	const [searchValue, setSearchValue] = useState('');

	// Search & filter
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

	// Renders

	const renderHeader = () => (
		<View>
			{Header && <Header />}

			{useSearchBar && !loading && <Searchbar placeholder='Search...' onChangeText={searchFilterFunction} value={searchValue} />}

			<LoadingIndicator isLoading={loading} />
		</View>
	);

	const renderFooter = () => <View>{Footer && <Footer />}</View>;

	const renderItem = (q) => <VerticalCard item={q.item} />;

	return (
		<View style={commonStyles.flex}>
			<FlatList
				ref={verticalFlatListRef}
				data={data}
				renderItem={(q) => renderItem(q)}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={null}
				ListHeaderComponent={renderHeader}
				ListFooterComponent={renderFooter}
				onRefresh={refreshFunc}
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
	refreshFunc: PropTypes.func.isRequired,
	data: PropTypes.any.isRequired,
	loading: PropTypes.bool.isRequired,
};
