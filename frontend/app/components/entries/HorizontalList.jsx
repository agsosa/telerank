import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';
import { colors } from '../../config/Styles';
import HorizontalCard from './HorizontalCard';

export default function HorizontalList(props) {
	const [currentIdx, setCurrentIdx] = useState(0);

	const _onViewableItemsChanged = useRef(({ viewableItems }) => {
		setCurrentIdx((oldCurrentIdx) => (viewableItems[0] && oldCurrentIdx != viewableItems[0].index ? viewableItems[0].index : oldCurrentIdx));
	});

	const _viewabilityConfig = useRef({
		minimumViewTime: 1,
		itemVisiblePercentThreshold: 80,
	});

	return (
		<View>
			<FlatList
				onViewableItemsChanged={_onViewableItemsChanged.current}
				viewabilityConfig={_viewabilityConfig.current}
				data={props.data}
				renderItem={(item) => <HorizontalCard item={item.item} />}
				keyExtractor={(item) => item._id}
				horizontal
			/>
			<Pagination dotsLength={props.data.length} activeDotIndex={currentIdx} dotStyle={styles.dot} inactiveDotOpacity={0.4} inactiveDotScale={0.6} />
		</View>
	);
}

const styles = StyleSheet.create({
	dot: {
		backgroundColor: colors.main,
		borderRadius: 5,
		height: 10,
		marginHorizontal: 4,
		width: 10,
	},
});
