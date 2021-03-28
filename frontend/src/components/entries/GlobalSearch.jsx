import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { colors, commonStyles } from '../../config/Styles';
import { getModuleData } from '../../lib/API';
import LoadingIndicator from '../LoadingIndicator';

const styles = StyleSheet.create({
	buttonBase: { marginHorizontal: 10, width: '35%' },
	buttonRandomText: { color: colors.tgDarkGray },
	buttonSearch: { backgroundColor: colors.main },
	buttonsView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 15,
		marginBottom: 20,
	},
	descriptionText: {
		color: 'gray',
		fontSize: 15,
		padding: 5,
		textAlign: 'center',
	},
	mainView: {
		alignContent: 'center',
		alignItems: 'center',
		marginVertical: 3,
	},
	searchBar: { marginTop: 15, width: '90%' },
	titleText: {
		color: colors.main,
		fontSize: 24,
		fontWeight: 'bold',
		paddingTop: 10,
		textAlign: 'center',
	},
});

export default function GlobalSearch() {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState('');
	const [loading, setLoading] = useState(false);

	const onChangeSearch = (query) => {
		setSearchQuery(query);
	};

	const onRandomClick = () => {
		setLoading(true);
		getModuleData('random')
			.then(([data]) => {
				navigation.navigate('Details', data);
			})
			.catch(() => {
				Alert.alert('Error', t('errorOccurred'), [{ text: 'OK' }]);
			})
			.finally(() => setLoading(false));
	};

	const onSearchClick = () => {
		if (searchQuery) {
			setLoading(true);
			const payload = { type: 'any', search: searchQuery };
			getModuleData('search', payload)
				.then((data) => {
					if (!data || !Array.isArray(data) || data.length === 0) {
						Alert.alert(t('searchNothingFound'), t('searchNoResults'), [{ text: 'OK' }]);
					} else navigation.navigate('SearchResult', { data, payload });
				})
				.catch(() => {
					Alert.alert('Error', t('errorOccurred'), [{ text: 'OK' }]);
				})
				.finally(() => setLoading(false));
		} else {
			Alert.alert('Error', t('searchTypeSomething'), [{ text: 'OK' }]);
		}
	};

	return (
		<View style={styles.mainView}>
			<Text style={styles.titleText}>{t('globalSearch.title')}</Text>
			<Text style={styles.descriptionText}>{t('globalSearch.subTitle')}</Text>
			{loading ? (
				<LoadingIndicator />
			) : (
				<>
					<Searchbar style={styles.searchBar} placeholder={`${t('search')}...`} onChangeText={onChangeSearch} value={searchQuery} onSubmitEditing={onSearchClick} />
					<View style={styles.buttonsView}>
						<Button style={styles.buttonBase} color='white' icon='cached' mode='contained' onPress={onRandomClick}>
							<Text style={styles.buttonRandomText}>{t('globalSearch.random')}</Text>
						</Button>
						<Button style={[styles.buttonBase, styles.buttonSearch]} color='black' icon='comment-search' mode='contained' onPress={onSearchClick}>
							<Text style={commonStyles.whiteText}>{t('search')}</Text>
						</Button>
					</View>
				</>
			)}
		</View>
	);
}
