import React, { useState, memo, useEffect, useRef, useCallback } from 'react';
import { View, FlatList, Linking, ActivityIndicator, Animated } from 'react-native';
import { Right, Left, Body} from 'native-base';
import { List, H2, H3, Text, ListItem, Thumbnail } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { Tile } from 'react-native-elements';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {truncateWithEllipses} from '../utils/Helpers'
import { Avatar, Button, Divider, Card, Caption, Chip, Title, Paragraph } from 'react-native-paper';

export default function HorizontalList(props) {
    const [currentIdx, setCurrentIdx] = useState(0);

    const _renderItem = ({item, index}) => {
        return (
            <View style={{flex:1, padding: 5}}> 
                <Card elevation={2} style={{width:"100%", minWidth:"100%"}}>
                    <Card.Title title={item.username} subtitle={""+item.type+" / "+item.category} />
                    <Card.Cover source={{ uri: item.image }} style={{width:"100%", resizeMode:"cover"}}/>

                    <Card.Content style={{marginTop:7}}>
                        <Caption style={{alignSelf:'center'}}>{truncateWithEllipses(item.title, 32)}</Caption>
                        <View style={{flex:1, flexDirection:'row', marginTop:5,  flexWrap:'wrap', justifyContent:'space-between',padding:10}}>
                        <Chip icon="thumb-up">{item.likes}</Chip><Chip icon="thumb-down">{item.dislikes}</Chip><Chip style={{alignSelf: 'flex-start'}} icon="account">{item.members}</Chip>
                        </View>
                    </Card.Content>
                </Card> 
            </View> 
        );
    }

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
                renderItem={_renderItem}          
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

    /*
    return (
        <View>
            <Carousel

            contentContainerCustomStyle={{paddingLeft:10}}

                layout={'default'}
                data={props.data}
                renderItem={_renderItem}
                itemWidth={250}
                sliderWidth={500}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <_pagination />
        </View>
    );*/
}

  