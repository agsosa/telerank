import React from 'react';
import { View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

export default function SectionTitle(props) {
    return (
        <View style={{flex:1, flexDirection:'row', marginHorizontal:30, marginVertical:15, borderBottomWidth:1, borderBottomColor:'darkgray', justifyContent:'flex-start'}}>
            <Button icon="history" color="darkgray" style={{marginRight:-20}} /><Headline style={{fontWeight:'bold', color:'#118FE8', }}>Latest Added</Headline>
        </View>
    )
}