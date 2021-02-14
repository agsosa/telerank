import React from 'react';
import { View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

export default function SectionTitle(props) {
    return (
        <View style={{flex:1, marginHorizontal:0, marginVertical:15, borderBottomWidth:1, alignContent: 'center', alignItems:'center', borderBottomColor:'darkgray'}}>
            <Headline style={{fontWeight:'bold', color:'#2196F3'}}>{props.children}</Headline>
        </View>
    )
}