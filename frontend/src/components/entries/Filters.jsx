import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import SectionTitle from '../SectionTitle';
import { colors } from '../../config/Styles';

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
	},
	mainView: { alignItems: 'center' },
});

const Filters = () => (
	<View style={styles.mainView}>
		<SectionTitle style={styles.filterText} size={15} text='Types' />

		<View style={styles.listView}>
			<View style={styles.itemView}>
				<Checkbox status='checked' color={colors.main} />
				<Text style={styles.checkboxLabel}>Channels</Text>
			</View>
			<View style={styles.itemView}>
				<Checkbox status='checked' color={colors.main} />
				<Text style={styles.checkboxLabel}>Groups</Text>
			</View>
			<View style={styles.itemView}>
				<Checkbox status='checked' color={colors.main} />
				<Text style={styles.checkboxLabel}>Bots</Text>
			</View>
			<View style={styles.itemView}>
				<Checkbox status='checked' color={colors.main} />
				<Text style={styles.checkboxLabel}>Stickers</Text>
			</View>
		</View>
		<SectionTitle style={styles.filterText} size={15} text='Languages' />
		<View style={styles.listView}>
			<View style={styles.itemView}>
				<Checkbox />
				<Text style={styles.checkboxLabel} color={colors.main}>
					English
				</Text>
			</View>
			<View style={styles.itemView}>
				<Checkbox />
				<Text style={styles.checkboxLabel} color={colors.main}>
					Español
				</Text>
			</View>
		</View>
	</View>
);

export default Filters;
