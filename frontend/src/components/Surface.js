import { useNavigation } from '@react-navigation/native';
import { H1 } from 'native-base';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, FlatList, Text, Linking, ActivityIndicator } from 'react-native';
import { Surface as _Surface } from 'react-native-paper';

        /*<_Surface style={props.surface_style || styles.surface}>
            {props.children}
    </_Surface>*/    
export default function Surface(props) {
    return (
        <View style={{padding:25, alignItems:'center'}}>
            <Text style={{textShadowRadius:10, color:'blue', fontSize:25}}>LATEST ENTRIES</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    surface: {
      padding: 8,
      height: '10%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
    },
  });