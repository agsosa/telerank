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
	const { data, payload } = route.params;

	function HeaderRenderer() {
		return <Text style={styles.subtitleText}>Results for the term(s) &quot;{payload.search}&quot;</Text>;
	}
	return <VerticalList Header={HeaderRenderer} useFilters initialData={data} apiModule='search' payload={payload} />;
}

SearchResultScreen.propTypes = {
	route: PropTypes.object.isRequired,
};

export default SearchResultScreen;
