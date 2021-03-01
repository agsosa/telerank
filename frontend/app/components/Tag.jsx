import * as React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import { Chip } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { commonStyles } from '../config/Styles';
import { formattedNumber, isNumber } from '../lib/Helpers';

const styles = StyleSheet.create({
	margin: { margin: '1%' },
});

export default function Tag({ icon, outlined = false, children, style, ...props }) {
	return (
		<Chip mode={outlined ? 'outlined' : false} icon={icon} style={[commonStyles.transparentBg, styles.margin, style]} {...props}>
			{isNumber(children) ? formattedNumber(children) : children}
		</Chip>
	);
}

Tag.defaultProps = {
	outlined: false,
	style: null,
};

Tag.propTypes = {
	icon: PropTypes.string.isRequired,
	outlined: PropTypes.bool,
	children: PropTypes.element.isRequired,
	style: ViewPropTypes.style,
};
