import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import SectionTitle from 'components/SectionTitle';
import { colors } from 'lib/Styles';
import { EnumEntryType } from 'telerank-shared/lib/EntryType';
import { getTranslatedEntryType, getTranslatedLanguage } from 'lib/locale/Locale';
import { EnumLanguage } from 'telerank-shared/lib/Language';

// TODO: Finish

const styles = StyleSheet.create({
	checkboxLabel: {
		color: colors.tgDarkGray,
		top: 6,
	},
	filterText: {
		padding: 5,
	},
	itemView: { alignItems: 'stretch', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', marginRight: 15, width: 'auto' },
	listView: {
		flexDirection: 'row',
		marginVertical: -10,
	},
	mainView: { alignItems: 'center', paddingBottom: 20 },
});

const checkedColor = colors.pink;

const Filters = () => {
	const { collapsed } = useSelector((state) => state.currentFilters);
	const dispatch = useDispatch();

	function handleCollapseBtnPress() {
		dispatch({ type: 'currentFilters/toggleCollapsed' });
	}

	return (
		<View>
			<Button icon={collapsed ? 'filter-menu' : 'filter-minus'} onPress={handleCollapseBtnPress}>
				<Text>{collapsed ? 'Show' : 'Hide'} filters</Text>
			</Button>
			<Collapsible collapsed={collapsed}>
				<View style={styles.mainView}>
					<SectionTitle style={styles.filterText} size={15} text='Types' />
					<View style={styles.listView}>
						{Object.values(EnumEntryType).map((q) => {
							return (
								<View key={q} style={styles.itemView}>
									<Checkbox status='checked' color={checkedColor} />
									<Text style={styles.checkboxLabel}>{getTranslatedEntryType(q)}</Text>
								</View>
							);
						})}
					</View>
					<SectionTitle style={styles.filterText} size={15} text='Languages' />
					<View style={styles.listView}>
						{Object.values(EnumLanguage).map((q) => {
							return (
								<View key={q} style={styles.itemView}>
									<Checkbox status='checked' color={checkedColor} />
									<Text style={styles.checkboxLabel}>{getTranslatedLanguage(q)}</Text>
								</View>
							);
						})}
					</View>
				</View>
			</Collapsible>
		</View>
	);
};

export default Filters;
