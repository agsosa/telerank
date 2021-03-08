import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';
import { PropTypes } from 'prop-types';
import { colors } from '../../config/Styles';
import HorizontalCard from './HorizontalCard';

const styles = StyleSheet.create({
	dot: {
		backgroundColor: colors.darkBlueGray,
		borderRadius: 5,
		height: 10,
		marginHorizontal: 4,
		width: 10,
	},
	flatList: {
		marginBottom: -15,
	},
	view: {
		marginBottom: -30,
	},
});

export default function HorizontalList({ data }) {
	const [currentIdx, setCurrentIdx] = useState(0);

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIdx((oldCurrentIdx) => (viewableItems[0] && oldCurrentIdx !== viewableItems[0].index ? viewableItems[0].index : oldCurrentIdx));
	});

	const viewabilityConfig = useRef({
		minimumViewTime: 1,
		itemVisiblePercentThreshold: 80,
	});

	return (
		<View style={styles.view}>
			<FlatList
				onViewableItemsChanged={onViewableItemsChanged.current}
				viewabilityConfig={viewabilityConfig.current}
				data={data}
				renderItem={(item) => <HorizontalCard item={item.item} />}
				keyExtractor={(item) => item._id}
				style={styles.flatList}
				horizontal
			/>
			<Pagination dotsLength={data.length} activeDotIndex={currentIdx} dotStyle={styles.dot} inactiveDotOpacity={0.4} inactiveDotScale={0.6} />
		</View>
	);
}

HorizontalList.propTypes = {
	data: PropTypes.any.isRequired,
};
