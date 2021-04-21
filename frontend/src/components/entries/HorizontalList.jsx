import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';
import { PropTypes } from 'prop-types';
import { colors } from 'lib/Styles';
import HorizontalCard from 'components/entries/HorizontalCard';
import { getModuleData } from 'lib/API';
import LoadingIndicator from 'components/LoadingIndicator';
import { useIsMounted } from 'lib/Helpers';
import NoEntriesFound from 'components/entries/NoEntriesFound';

const styles = StyleSheet.create({
	dot: {
		backgroundColor: colors.darkBlueGray,
		borderRadius: 5,
		height: 10,
		marginHorizontal: 4,
		width: 10,
	},
	flatList: {
		marginBottom: -20,
	},
	view: {
		marginBottom: -20,
	},
});

const RenderItem = (item) => <HorizontalCard item={item.item} />;

export default function HorizontalList({ apiModule }) {
	const isMounted = useIsMounted();
	const [currentIdx, setCurrentIdx] = useState(0);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const refreshData = async () => {
		setLoading(true);
		setData([]);

		getModuleData(apiModule).then((result) => {
			if (isMounted) {
				setData(result);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		refreshData();
	}, []);

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIdx((oldCurrentIdx) => (viewableItems[0] && oldCurrentIdx !== viewableItems[0].index ? viewableItems[0].index : oldCurrentIdx));
	});

	const viewabilityConfig = useRef({
		minimumViewTime: 1,
		itemVisiblePercentThreshold: 80,
	});

	if (loading || !data || !Array.isArray(data)) return <LoadingIndicator />;

	if (data.length === 0) return <NoEntriesFound />;

	return (
		<View style={styles.view}>
			<FlatList
				onViewableItemsChanged={onViewableItemsChanged.current}
				viewabilityConfig={viewabilityConfig.current}
				data={data}
				renderItem={RenderItem}
				keyExtractor={(item) => item._id}
				style={styles.flatList}
				horizontal
			/>
			<Pagination dotsLength={data.length} activeDotIndex={currentIdx} dotStyle={styles.dot} inactiveDotOpacity={0.4} inactiveDotScale={0.6} />
		</View>
	);
}

HorizontalList.propTypes = {
	apiModule: PropTypes.string.isRequired,
};
