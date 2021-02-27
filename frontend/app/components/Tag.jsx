import * as React from 'react';
import { Chip } from 'react-native-paper';
import { commonStyles } from '../config/Styles';
import { formattedNumber, isNumber } from '../lib/Helpers';

export default function Tag({icon, children}) {
	return (
		<Chip icon={icon} style={commonStyles.transparentBg}>
			{isNumber(children) ? formattedNumber(children) : children}
		</Chip>
	);
}
