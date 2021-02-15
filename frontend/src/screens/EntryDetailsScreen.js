import React from 'react';
import { Button, Text, View } from 'react-native';

export default function EntryDetailsScreen({route, navigation}) {
    const data = route.params;
    //        { data && <Text>{JSON.stringify(data)}</Text>}
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderTopColor:'black', borderTopStartRadius:0, borderTopEndRadius:0, borderTopWidth:100 }}>
        
      </View>
    );
  }