import React, { useState} from 'react';
import { View } from 'react-native';
import { Searchbar  } from 'react-native-paper';

export default function GlobalSearch(props)  {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);
    
    return (
        <View>        
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />


        </View>
    )
}

