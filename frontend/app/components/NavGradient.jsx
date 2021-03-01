import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../config/Styles';

export default function NavGradient({ style, children }) {
	return (
		<LinearGradient start={{ x: 0.75, y: 0 }} end={{ x: 0.25, y: 1 }} colors={[colors.alt, colors.main]} style={[style]}>
			{children}
		</LinearGradient>
	);
}
