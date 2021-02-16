import React, { useState, useRef } from 'react';
import { View, FlatList } from 'react-native';
import {Pagination} from 'react-native-snap-carousel';
import {truncateWithEllipses} from '../../utils/Helpers'
import { Card, Caption } from 'react-native-paper';
import Tag from '../Tag';
import HorizontalCard from './HorizontalCard';

export default function HorizontalList(props) {
    const [currentIdx, setCurrentIdx] = useState(0);

    const _onViewableItemsChanged = useRef(({viewableItems, changed}) => { 
        setCurrentIdx(oldCurrentIdx => { 
            return viewableItems[0] && oldCurrentIdx != viewableItems[0].index ? viewableItems[0].index : oldCurrentIdx;
        });
    })//, []);
 
    const _viewabilityConfig = useRef({  
        minimumViewTime: 1,
        //waitForInteraction: true,
        itemVisiblePercentThreshold: 80  
    });

    return ( 
        <View> 
            <FlatList      
                onViewableItemsChanged={_onViewableItemsChanged.current}
                viewabilityConfig={_viewabilityConfig.current}
                data={props.data}          
                renderItem={item => <HorizontalCard item={item.item}/>}          
                keyExtractor={item => item._id}
                horizontal 
            /> 
            <Pagination
                dotsLength={props.data.length}
                activeDotIndex={currentIdx} 
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 4,
                    backgroundColor: 'rgba(30,144,255, 1)'
                }}
                inactiveDotOpacity={0.4} 
                inactiveDotScale={0.6}
            /> 
        </View>
    )
}

  