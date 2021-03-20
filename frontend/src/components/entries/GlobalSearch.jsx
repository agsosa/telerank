import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors, commonStyles } from '../../config/Styles';
import { getModuleData } from '../../lib/API';
import { useIsMounted } from '../../lib/Helpers';
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
	const isMounted = useIsMounted();
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState('');
	const [loading, setLoading] = useState(false);

	const onChangeSearch = (query) => {
		setSearchQuery(query);
	};

	const onRandomClick = () => {
		setLoading(true);
		getModuleData('random', {}, true)
			.then(([data]) => {
				if (isMounted) {
					setLoading(false);
					navigation.navigate('Details', data);
				}
			})
			.catch(() => {
				setLoading(false);
				Alert.alert('Error', 'An error occurred, please try again.', [{ text: 'OK' }]);
			});
	};

	const onSearchClick = () => {
		setLoading(true);
		getModuleData('search', { type: 'any', search: searchQuery }, true)
			.then((data) => {
				if (isMounted) {
					setLoading(false);
					if (!data || !Array.isArray(data) || data.length === 0) {
						Alert.alert('Nothing found', 'No results were found for your search', [{ text: 'OK' }]);
					}
					// navigation.navigate('Details', data);
					console.log(`Received usernames: ${data.map((q) => q.username)}`);
				}
			})
			.catch(() => {
				setLoading(false);
				Alert.alert('Error', 'An error occurred, please try again.', [{ text: 'OK' }]);
			});
	};

	return (
		<View style={styles.mainView}>
			<Text style={styles.titleText}>Discover your next community</Text>
			<Text style={styles.descriptionText}>Search more than 3000 Telegram Channels, Groups, Bots and Stickers.</Text>
			{loading ? (
				<LoadingIndicator />
			) : (
				<>
					<Searchbar style={styles.searchBar} placeholder='Search' onChangeText={onChangeSearch} value={searchQuery} onSubmitEditing={onSearchClick} />
					<View style={styles.buttonsView}>
						<Button style={styles.buttonBase} color='white' icon='cached' mode='contained' onPress={onRandomClick}>
							<Text style={styles.buttonRandomText}>Aleatorio</Text>
						</Button>
						<Button style={[styles.buttonBase, styles.buttonSearch]} color='black' icon='comment-search' mode='contained' onPress={onSearchClick}>
							<Text style={commonStyles.whiteText}>Buscar</Text>
						</Button>
					</View>
				</>
			)}
		</View>
	);
}
