/* eslint-disable */
const { applyConfigForLinkedDependencies } = require('@carimus/metro-symlinked-deps');

module.exports = applyConfigForLinkedDependencies(
	{
		resolver: {
			sourceExts: ['jsx', 'js', 'ts', 'tsx'],
		},
		transformer: {
			assetPlugins: ['expo-asset/tools/hashAssetFiles'],
		},
	},
	{ projectRoot: __dirname }
);
