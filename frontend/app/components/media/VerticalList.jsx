import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { commonStyles, colors } from '../../config/Styles';
import VerticalCard from './VerticalCard';
import { getModuleData } from '../../lib/API';

const ENABLE_REFRESH_DATA_LOOP = true;
const REFRESH_DATA_LOOP_INTERVAL = 60000 * 5; // ms

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
		const done = (forceRepeatInmediatly = false) => {
			setLoading(false);
			if (forceRepeatInmediatly) refreshData();
			if (ENABLE_REFRESH_DATA_LOOP) setTimeout(() => refreshData(), REFRESH_DATA_LOOP_INTERVAL);
		};

		setLoading(true);

		// TODO: Implement payload (second parameter of getModuleData)
		getModuleData(apiModule, null)
			.then((result) => {
				setData(result);
				done();
			})
			.catch((reason) => {
				console.log(`getModuleData rejected with reason ${reason}`);
				// TODO: Show error etc. (revisar retry)
				done();
			});
	};

	useEffect(() => {
		refreshData();
		return () => {
			// save data
		};
	});

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
	Header: PropTypes.element,
	Footer: PropTypes.element,
};
