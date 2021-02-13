import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function EntryDetailsScreen({route, navigation}) {
    const data = route.params;
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push('Details')}
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />

        { data && <Text>{JSON.stringify(data)}</Text>}
      </View>
    );
  }