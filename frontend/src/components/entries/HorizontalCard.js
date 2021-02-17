import React, { useState, useRef } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import {truncateWithEllipses} from '../../utils/Helpers'
import { Card, Caption, Text } from 'react-native-paper';
import { Right, Badge, Icon } from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Tag from '../Tag';
import { formatLanguageCode } from '../../utils/Helpers';

export default function HorizontalCard(props) {
    const navigation = useNavigation();
    const item = props.item; 
    
    return (
        <View style={{flex:1, padding: 5}}> 
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Details', props.item)}>
                <Card elevation={2} style={[{width:"100%", minWidth:"100%"},item.featured && {backgroundColor:'#FFEEC7', borderColor:'#FFB400', borderLeftWidth:10}]}>
                    <Card.Title title={item.username} subtitle={""+item.type+" / "+item.category + " / "+formatLanguageCode(item.language)} />
                    <Card.Cover source={{ uri: item.image }} style={{width:"100%", resizeMode:"cover"}}/>

                    {item.featured &&
                        <View style={{zIndex:5, position:'absolute', right:'1%', top:'20%'}}>
                            <Badge style={{flexDirection:'row', backgroundColor:'#FFB400'}}>
                                    <Icon name="star" style={{ fontSize: 15, color: "#fff", lineHeight: 20 }}/>
                                    <Text style={{ color: 'white' }}>Featured</Text>
                            </Badge>
                        </View>
                    }

                    <Card.Content style={{marginTop:7}}>
                        <Caption style={{alignSelf:'center'}}>{truncateWithEllipses(item.title, 32)}</Caption>
                        <View style={{flex:1, flexDirection:'row', marginTop:5,  flexWrap:'wrap', justifyContent:'space-between',padding:10}}>
                        <Tag icon="thumb-up">{item.likes}</Tag><Tag icon="thumb-down">{item.dislikes}</Tag><Tag style={{alignSelf: 'flex-start'}} icon="account">{item.members}</Tag>
                        </View>
                    </Card.Content>
                </Card> 
            </TouchableOpacity>
        </View> 
    )
}