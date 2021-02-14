import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import HorizontalList from './HorizontalList';
import SectionTitle from '../SectionTitle';
import { Text } from 'native-base';
import VerticalCard from './VerticalCard'

export default function VerticalList(props) {
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
                <SectionTitle><Text>Latest entries</Text></SectionTitle>
                <HorizontalList data={data}/>
            </View>
        );
    };

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
                        renderItem={(q) => <VerticalCard item={q.item} />}          
                        keyExtractor={item => item._id}  
                        ItemSeparatorComponent={null}
                        ListHeaderComponent={renderHeader()}
                        ListFooterComponent={renderFooter()}
                        onRefresh={() => fetchData()}
                        refreshing={loading}
                    /> 
            </View>
        );
    }
  }

  