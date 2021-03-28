import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import SectionTitle from '../SectionTitle';
import { colors } from '../../config/Styles';

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

const Filters = ({ enabledFilters }) => {
	const [collapsed, setCollapsed] = useState(true); // TODO: Pasar a redux

	return (
		<View>
			<Button icon={collapsed ? 'filter-menu' : 'filter-minus'} onPress={() => setCollapsed(!collapsed)}>
				<Text>{collapsed ? 'Show' : 'Hide'} filters</Text>
			</Button>
			<Collapsible collapsed={collapsed}>
				<View style={styles.mainView}>
					<SectionTitle style={styles.filterText} size={15} text='Types' />

					<View style={styles.listView}>
						<View style={styles.itemView}>
							<Checkbox status='checked' color={checkedColor} />
							<Text style={styles.checkboxLabel}>Channels</Text>
						</View>
						<View style={styles.itemView}>
							<Checkbox status='checked' color={checkedColor} />
							<Text style={styles.checkboxLabel}>Groups</Text>
						</View>
						<View style={styles.itemView}>
							<Checkbox status='checked' color={checkedColor} />
							<Text style={styles.checkboxLabel}>Bots</Text>
						</View>
						<View style={styles.itemView}>
							<Checkbox status='checked' color={checkedColor} />
							<Text style={styles.checkboxLabel}>Stickers</Text>
						</View>
					</View>
					<SectionTitle style={styles.filterText} size={15} text='Languages' />
					<View style={styles.listView}>
						<View style={styles.itemView}>
							<Checkbox />
							<Text style={styles.checkboxLabel} color={checkedColor}>
								English
							</Text>
						</View>
						<View style={styles.itemView}>
							<Checkbox />
							<Text style={styles.checkboxLabel} color={checkedColor}>
								Español
							</Text>
						</View>
					</View>
				</View>
			</Collapsible>
		</View>
	);
};

export default Filters;
