import * as React from 'react';
import { ViewPropTypes, Text } from 'react-native';
import { Chip } from 'react-native-paper';
import { PropTypes } from 'prop-types';
import { commonStyles } from 'lib/Styles';
import { formattedNumber } from 'lib/Helpers';

export default function NumberTag({ icon, outlined, number, style, ...props }) {
	return (
		<Chip mode={outlined ? 'outlined' : false} icon={icon} style={[commonStyles.transparentBg, style]} {...props}>
			<Text>{formattedNumber(number)}</Text>
		</Chip>
	);
}

NumberTag.defaultProps = {
	outlined: false,
	style: {},
	number: 0,
};

NumberTag.propTypes = {
	icon: PropTypes.string.isRequired,
	outlined: PropTypes.bool,
	number: PropTypes.number,
	style: ViewPropTypes.style,
};
