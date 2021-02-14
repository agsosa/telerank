import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Tabs, TabScreen, useTabNavigation} from 'react-native-paper-tabs';
import { Banner, Searchbar } from 'react-native-paper';

import VerticalList from '../components/entries/VerticalList';
import HomeTab from './tabscreens/HomeTab';

function _Tabs() {
    const goTo = useTabNavigation(); // <Button onPress={() => goTo(3)}>Go to Flights</Button>

    return (
      <Tabs iconPosition="leading" style={{ marginTop:5,elevation: 5, backgroundColor: 'white'}} mode="scrollable" showLeadingSpace={true}>
          <TabScreen label="Inicio" icon="home">
              <HomeTab />
          </TabScreen>
          <TabScreen label="Top 100" icon="crown">
              <Top100Tab />
          </TabScreen>
          <TabScreen label="Canales" icon="bullhorn">
              <ChannelsTab />
          </TabScreen>
          <TabScreen label="Grupos" icon="forum">
              <GroupsTab />
          </TabScreen>
          <TabScreen label="Bots" icon="robot">
              <BotsTab />
          </TabScreen>
          <TabScreen label="Stickers" icon="sticker">
              <StickersTab />
          </TabScreen>
      </Tabs>
    )
}

function Top100Tab() {
  return (
    <View style={{ flex:1 }}>
      
    </View>
  );
}

function ChannelsTab() {
  return (
    <View style={{ flex:1 }}>
      
    </View>
  );
}

function GroupsTab() {
  return (
    <View style={{ flex:1 }}>
      
    </View>
  );
}

function BotsTab() {
  return (
    <View style={{ flex:1 }}>
      
    </View>
  );
}

function StickersTab() {
  return (
    <View style={{ flex:1 }}>
      
    </View>
  );
}

export default function MainScreen({navigation}) {
    return (
        <View style={{ flex: 1}}>
            <_Tabs />
        </View>
    );
}