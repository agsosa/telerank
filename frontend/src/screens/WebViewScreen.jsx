import React from 'react';
import { WebView } from 'react-native-webview';
import { PropTypes } from 'prop-types';
import LoadingIndicator from '../components/LoadingIndicator';

const RenderLoading = () => <LoadingIndicator />;

export default function WebViewScreen({ route }) {
	const { url } = route.params;
	return <WebView startInLoadingState renderLoading={RenderLoading} source={{ uri: url }} />;
}

WebViewScreen.propTypes = {
	route: PropTypes.object.isRequired,
};
