import React from 'react';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as models from './Models';

const store = init({ models });

function StoreProvider({ children }) {
	return <Provider store={store}>{children}</Provider>;
}

StoreProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default StoreProvider;
