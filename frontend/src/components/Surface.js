import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, FlatList, Text, Linking, ActivityIndicator } from 'react-native';
import { Surface as _Surface } from 'react-native-paper';

export default function Surface(props) {
    return (
        <_Surface style={props.surface_style || styles.surface}>
            {props.children}
        </_Surface>
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