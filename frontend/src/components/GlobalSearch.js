import React, { useState} from 'react';
import { View, Text } from 'react-native';
import { Searchbar, Button, IconButton } from 'react-native-paper';

export default function GlobalSearch(props)  {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => {
        setSearchQuery(query);
    }
    
    return (
        <View style={{
            marginVertical:3,
            backgroundColor:'white',
            alignContent:'center',
            alignItems:'center'
            }}> 
        
            <Text style={{textAlign:'center', paddingTop:10, fontSize:19, color:'#2196F3', fontWeight:'bold', fontStyle:'italic'}}>Discover your next community</Text>

            <Text style={{textAlign:'center', padding:5, fontSize:15, color:'black'}}>Search more than 5000 Telegram Channels, Groups, Bots and Stickers.

            {"\n"}{"\n"}<Text onPress={() => (props && props.scrollToBottom) && props.scrollToBottom() } style={{color:'#393D3E', fontWeight:'bold', textDecorationLine:'underline'}}>Tap here to view statistics</Text></Text>
 
            <Searchbar
                style={{width:'100%',marginTop:20, borderTopWidth:0.4, borderTopColor:'rgba(57, 61, 62, 0.30)'}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

            <View style={{flex:1, flexDirection:'row', justifyContent:'space-evenly', padding:10}}>
                <Button style={{width:'50%', marginHorizontal:10}} color='#DF4294' icon="cached" mode="contained" onPress={() => console.log('Pressed')}>
                Aleatorio
                </Button>
                <Button style={{width:'50%', marginHorizontal:10}} color='#DF4294' icon="comment-search" mode="contained" onPress={() => console.log('Pressed')}>
                Buscar
                </Button>
            </View>

        </View>
    )
}

