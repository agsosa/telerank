import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, Linking, ActivityIndicator } from 'react-native';
import { Right, Left, Body} from 'native-base';
import { List, H2, H3, Title, ListItem, Thumbnail } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { Tile } from 'react-native-elements';

import EntriesList from '../components/EntriesList';

export default function HomeScreen({navigation}) {
    return (
        <View style={{ flex: 1 }}>
            <Button
                title="Go to Details" 
                onPress={() => navigation.navigate('Details')}
            />

            <EntriesList navigation={navigation} />
        </View>
    );
}

  