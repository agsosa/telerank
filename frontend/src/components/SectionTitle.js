import React from 'react';
import { View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

export default function SectionTitle(props) {
    return (
        <View style={{
            flex:1,
            marginVertical:10, 
            padding:3,
            backgroundColor:'#2196F3', 
            borderBottomWidth:4,
            borderBottomColor:'#20E1C2', 
            margin:-10,
        }}> 
            <Headline style={{ fontSize:17,fontWeight:'normal', color:'white', alignSelf:'center'}}>{props.children}</Headline>
        </View>
    )
}