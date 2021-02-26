import * as React from 'react';
import {Chip} from 'react-native-paper';
import { formattedNumber, isNumber } from '../lib/Helpers'

export default function Tag(props) {
    return (
        <Chip icon={props.icon} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>{isNumber(props.children) ? formattedNumber(props.children) : props.children}</Chip>
    )
}