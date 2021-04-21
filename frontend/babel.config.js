module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['module:metro-react-native-babel-preset'],
		plugins: [
			'react-native-paper/babel',
			[
				'module-resolver',
				{
					root: ['.'],
					extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.jsx'],
					alias: {
						src: './src',
						img: './img',
						screens: './src/screens/',
						components: './src/components/',
						lib: './src/lib',
					},
				},
			],
		],
	};
};
