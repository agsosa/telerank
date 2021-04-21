import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import VerticalList from 'components/entries/VerticalList';
import { colors } from 'lib/Styles';

const styles = StyleSheet.create({
	subtitleText: {
		color: colors.grayAlt,
		fontSize: 20,
		marginVertical: 10,
		textAlign: 'center',
	},
});

function SearchResultScreen({ route }) {
	const { t } = useTranslation();
	const { data, payload } = route.params;

	function HeaderRenderer() {
		return <Text style={styles.subtitleText}>{t('searchResults', { terms: `"${payload.search}"` })}</Text>;
	}
	return <VerticalList Header={HeaderRenderer} useFilters initialData={data} apiModule='search' payload={payload} />;
}

SearchResultScreen.propTypes = {
	route: PropTypes.object.isRequired,
};

export default SearchResultScreen;
