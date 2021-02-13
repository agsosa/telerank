import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, Linking, ActivityIndicator } from 'react-native';
import { Right, Left, Body} from 'native-base';
import { List, H2, H3, Title, ListItem, Thumbnail } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { Tile } from 'react-native-elements';
import HorizontalList from './HorizontalList';

export default function EntriestList(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    let arrayholder = [];

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        let url = "http://22f88f873224.ngrok.io/api/entries?page=0&limit=10";
        setLoading(true);

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("received data = "+JSON.stringify(data))
            setError(null);
            setData(data);
            setLoading(false);
            arrayholder = data;
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
    
    function searchFilterFunction(text) {
        setSearchValue(text);

        const newData = arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.symbol.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        setData(newData);
    };

    function renderHeader() {
        return (
            <View>
                <SearchBar
                    placeholder="Search..."
                    lightTheme
                    round
                    onChangeText={text => searchFilterFunction(text)}
                    autoCorrect={false}
                    value={searchValue}
                />
                <HorizontalList data={data}/>
            </View>
        );
    };

    function renderFooter() {
        return (
            <Text>No more entries...</Text>
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
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                        onRefresh={() => fetchData()}
                        refreshing={loading}
                    /> 
            </View>
        );
    }
  }

  