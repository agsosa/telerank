import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, FlatList, Text, Linking, ActivityIndicator } from 'react-native';
import {
    Button,
    Title,
    Paragraph,
  } from 'react-native-paper';

import {
    Tabs,
    TabScreen,
    useTabIndex,
    useTabNavigation,
  } from 'react-native-paper-tabs';

import VerticalList from '../components/VerticalList';

function _Tabs() {
    const goTo = useTabNavigation();

    return (
      <Tabs
        // defaultIndex={0} // default = 0
        // uppercase={false} // true/false | default=true | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
         iconPosition="top" // leading, top | default=leading
        style={{ elevation: 8}} // works the same as AppBar in react-native-paper
        // dark={false} // works the same as AppBar in react-native-paper
        // theme={} // works the same as AppBar in react-native-paper
         mode="scrollable" // fixed, scrollable | default=fixed
        // onChangeIndex={(newIndex) => {}} // react on index change
         showLeadingSpace={false} //  (default=true) show leading space in scrollable tabs inside the header
      >
        <TabScreen label="Principal" icon="home">
           <ExploreWitHookExamples />
        </TabScreen>
        <TabScreen label="Top 100" icon="crown">
            <View>
            <Title>Explore</Title>
            <Button onPress={() => goTo(3)}>Go to Flights</Button>
            </View>
        </TabScreen>
        <TabScreen label="Canales" icon="bullhorn">
           <View style={{ backgroundColor: 'red', flex:1 }} />
        </TabScreen>
        <TabScreen label="Grupos" icon="forum">
           <View style={{ backgroundColor: 'red', flex:1 }} />
        </TabScreen>
        <TabScreen label="Bots" icon="robot">
           <View style={{ backgroundColor: 'red', flex:1 }} />
        </TabScreen>
        <TabScreen label="Stickers" icon="sticker">
           <View style={{ backgroundColor: 'red', flex:1 }} />
        </TabScreen>
      </Tabs>
    )
}

function ExploreWitHookExamples() {
    const navigation = useNavigation();
    return (
      <View style={{ flex:1 }}>
        <VerticalList navigation={navigation} />
      </View>
    );
  }

export default function HomeScreen({navigation}) {
    return (
        <View style={{ flex: 1}}>
            <_Tabs />
        </View>
    );
}