import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../config/Styles';

const styles = StyleSheet.create({
	loadingView: { alignItems: 'center', flex: 1, justifyContent: 'center', marginVertical: 50 },
});

export default function LoadingIndicator() {
	return (
		<View style={styles.loadingView}>
			<ActivityIndicator size='large' color={colors.main} />
		</View>
	);
}
