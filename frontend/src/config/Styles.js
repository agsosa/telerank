import { StyleSheet } from 'react-native';

export const colors = {
	main: '#2196F3',
	mainLight: '#55AEF7',
	alt: '#00E5FF',
	featured: '#FFB400',
	featuredLight: '#FFEEC7',
	tgDarkGray: '#17212B',
	tgDarkGray2: '#0E1621',
	tgLightGray: '#242F3D',
	darkBlueGray: '#516A8A',
	lightBlueGray: '#6282A3',
	niceGreen: '#1CB55E',
	alt2: '#1C73B4',
	pink: '#DF4294',
	purple: '#7F20F3',
	red: '#F44336',
	green: '#4CAF50',
	grayAlt: '#5A5A5A',
	grayAlt2: '#666666',
};

export const commonStyles = StyleSheet.create({
	flex: { flex: 1 },
	thumbnail: { borderRadius: 60 / 2, height: 60, width: 60 },
	transparentBg: { backgroundColor: 'transparent' },
	whiteText: { color: 'white' },
});

/* eslint-disable global-require */
export const placeholderImage = require('../../img/tg_placeholder.jpg');
export const userPlaceholderImage = require('../../img/user.jpg');
