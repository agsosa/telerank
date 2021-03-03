import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { commonStyles, colors } from '../../config/Styles';
import VerticalCard from './VerticalCard';
import { getModuleData } from '../../lib/API';

const styles = StyleSheet.create({
	loadingView: { alignItems: 'center', flex: 1, justifyContent: 'center', marginVertical: 50 },
});

export default function VerticalList({ apiModule, Header, Footer, useSearchBar }) {
	const verticalFlatListRef = useRef();

	// State
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState('');

	// Data
	const refreshData = () => {
		setLoading(true);

		// TODO: Implement payload (second parameter of getModuleData)
		getModuleData(apiModule, null)
			.then((result) => {
				setData(result);
				setLoading(false);
			})
			.catch((reason) => {
				console.log(`getModuleData rejected with reason ${reason}`);
				// TODO: Show error etc. (revisar retry)
				setLoading(false);
			});
	};

	useEffect(() => {
		refreshData();
		return () => {
			// save data
		};
	}, []);

	// Search & filter
	const applySearchValue = () => {
		if (data && data.length > 0) {
			const newData = data.filter((item) => {
				const itemData = `${item.username.toUpperCase()} ${item.title.toUpperCase()}`;
				const textData = searchValue.toUpperCase();

				return itemData.indexOf(textData) > -1;
			});

			if (newData !== data) setData(newData);
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

			{loading && (
				<View style={styles.loadingView}>
					<ActivityIndicator size='large' color={colors.main} />
				</View>
			)}
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
	apiModule: PropTypes.string.isRequired,
	useSearchBar: PropTypes.bool,
	Header: PropTypes.func,
	Footer: PropTypes.func,
};
