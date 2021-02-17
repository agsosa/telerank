import React from 'react';
import {LinearGradient} from 'expo-linear-gradient'

export default function NavGradient(props) {
    return (
        <LinearGradient start={{x: 0.75, y: 0}} end={{x: 0.25, y: 1}} colors={['#20E1C2', '#2196F3']} style={props.style}>
            {props.children}
        </LinearGradient> 
    )
}