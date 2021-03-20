import React from 'react';
import { WebView } from 'react-native-webview';
import { PropTypes } from 'prop-types';

export default function WebViewScreen({ route }) {
	const { url } = route.params;
	return <WebView source={{ uri: url }} />;
}

WebViewScreen.propTypes = {
	route: PropTypes.object.isRequired,
};
