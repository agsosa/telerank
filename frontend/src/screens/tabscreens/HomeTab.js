import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Searchbar, Banner, Badge, Text } from 'react-native-paper';
import {Col, Row, Grid} from 'native-base';

import Stats from '../../components/Stats';
import GlobalSearch from '../../components/GlobalSearch';
import VerticalList from '../../components/entries/VerticalList';
import SectionTitle from '../../components/SectionTitle';
import {formattedNumber} from '../../utils/Helpers';

export default function HomeTab() {

    function HeaderRenderer() {
      return (
        <View style={{padding:10}}>  
                <Banner
                    visible={true}
                    style={{marginVertical:5}}
                    actions={[
                    ]}
                    icon={({size}) => (
                        <Image
                        source={{
                            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
                        }}
                        style={{
                            width: size,
                            height: size,
                        }}
                        />
                    )}>
                <Text>Agrega tu canal, grupo, bot o sticker de Telegram al directorio gratis! <Text style={{color:'#2196F3', fontWeight:'bold', textDecorationLine:'underline'}}>Tap here</Text></Text>
          </Banner>

    <GlobalSearch />

        <SectionTitle>Recently Added</SectionTitle>

        <SectionTitle>Featured Channels and Bots</SectionTitle>
        
      </View>
      )
    };

    function FooterRenderer() {
        return (
            <View style={{padding: 10}}>

                <Banner
                    visible={true}
                    actions={[
                    ]}
                    icon={({size}) => (
                        <Image
                        source={{
                            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
                        }}
                        style={{
                            width: size,
                            height: size,
                        }}
                        />
                    )}>
                    Do you want to feature your Telegram Channel, Group or Bot here? <Text style={{color:'#2196F3', fontWeight:'bold', textDecorationLine:'underline'}}>More information</Text>
                </Banner>

                <SectionTitle>Estadísticas</SectionTitle>
                <Stats />

            </View>
        )
    }

    return (
      <View style={{ flex:1 }}>
        <VerticalList searchbar={false} header={HeaderRenderer} footer={FooterRenderer} api_url="http://55951ba206c2.ngrok.io/api/entries?page=0&limit=5" /> 
      </View>
    );
}