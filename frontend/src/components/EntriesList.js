import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { View, Button, FlatList, Text, Linking, ActivityIndicator } from 'react-native';
import { Right, Left, Body} from 'native-base';
import { List, H2, H3, Title, ListItem, Thumbnail } from 'native-base';
//import { SearchBar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import { Tile } from 'react-native-elements';
import HorizontalList from './HorizontalList';
import Surface from './Surface';

export default function EntriestList(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [auxData, setAuxData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        let url = "http://22f88f873224.ngrok.io/api/entries?page=0&limit=10";
        setLoading(true);

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            //console.log("received data = "+JSON.stringify(data))
            console.log("fetchData() success");
            setError(null);
            setData(data); // TODO: Ver si es necesario optimizar los objetos de data, eliminando campos sin uso en flatlist (description por ejemplo)
            setLoading(false);
            setAuxData(data);
            console.log(auxData.length);
        })
        .catch(error => {
            console.log("error = "+error)
            setLoading(false);
            setError(error);
        });
    };

    function renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: '258%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '0%',
                }}
            />
        );
    };
    
    const searchFilterFunction = (text) => {
        setSearchValue(text);

        console.log("searchfilterfunction "+auxData.length)

        const newData = auxData.filter(item => {
            const itemData = `${item.username.toUpperCase()} ${item.title.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        setData(newData);
    };

    function renderHeader() {
        return (
            <View>
                <View style={{padding: 10}}>
                    <Searchbar
                        placeholder="Search..."
                        //lightTheme
                        //round
                        onChangeText={searchFilterFunction}
                        //autoCorrect={false}
                        value={searchValue}
                    />
                </View>
            </View>
        );
    };

    function renderFooter() {
        return (
            <View>
                <Surface><Text>Latest entries</Text></Surface>
                <HorizontalList data={data}/>
            </View>
        );
    };

    function renderItem(q) {
        return (
            <ListItem noBorder key={q.item._id} thumbnail onPress={() => { props.navigation.navigate('Details', q.item) }}>
                <Left>
                    <Thumbnail square source={{ uri: q.item.image }} small />
                </Left>
                <Body>
                    <Text style={{fontWeight:'bold', fontSize:20}}>{q.item.username}</Text>
                    <Text note>{q.item.title}</Text>
                </Body>
                <Right>

                </Right>
            </ListItem>
        )
    }

    // TODO: IMPLEMENT INFINITE SCROLL
    // Render
    if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ); 
    }
    else {
        return (
            <View style={{ flex: 1 }}>
                    <FlatList          
                        data={data}    
                        renderItem={renderItem}          
                        keyExtractor={item => item._id}  
                        ItemSeparatorComponent={renderSeparator}
                        ListHeaderComponent={renderHeader()}
                        ListFooterComponent={renderFooter()}
                        onRefresh={() => fetchData()}
                        refreshing={loading}
                    /> 
            </View>
        );
    }
  }

  