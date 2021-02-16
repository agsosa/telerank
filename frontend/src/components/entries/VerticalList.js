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
        // TODO: Retry then show error
        let url = props.api_url;

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
            console.log("error = "+error+" url = "+url)
            setLoading(false);
            setError(error);
        });
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

    function renderLocalHeader() {
        return (
            <View>
                {props.header && <props.header />}
                
                {props.searchbar &&
                <Searchbar
                    placeholder="Search..."
                    //lightTheme
                    //round
                    onChangeText={searchFilterFunction}
                    //autoCorrect={false}
                    value={searchValue}
                />}
            </View>
        )
    }

    function renderLocalFooter() {
        return (
            <View>
                {props.footer && <props.footer />}
                <HorizontalList data={data}/>
            </View>
        );
    };

    
    // TODO: IMPLEMENT INFINITE SCROLL
    // Render
    if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#2196F3" />
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
                        ListHeaderComponent={renderLocalHeader()}
                        ListFooterComponent={renderLocalFooter()}
                        onRefresh={() => fetchData()}
                        refreshing={loading}
                    /> 
            </View>
        );
    }
  }

  