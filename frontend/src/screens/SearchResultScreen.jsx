import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import VerticalList from '../components/entries/VerticalList';
import { colors } from '../config/Styles';

const styles = StyleSheet.create({
	subtitleText: {
		color: colors.grayAlt,
		fontSize: 20,
		marginVertical: 10,
		textAlign: 'center',
	},
});

function SearchResultScreen({ route }) {
	const { data, searchText } = route.params;
	console.log(data.length, searchText);
	function HeaderRenderer() {
		return (
			<Text style={styles.subtitleText}>
				{data.length} entries found for the term(s) &quot;{searchText}&quot;
			</Text>
		);
	}
	return <VerticalList Header={HeaderRenderer} useFilters useData={data} />;
}

SearchResultScreen.propTypes = {
	route: PropTypes.object.isRequired,
};

export default SearchResultScreen;
