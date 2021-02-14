import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { View, FlatList, Linking, ActivityIndicator, Image } from 'react-native';
import { List, H2, H3, Title, ListItem } from 'native-base';
//import { SearchBar } from 'react-native-elements';
import { Searchbar, Chip } from 'react-native-paper';
import { Tile } from 'react-native-elements';
import HorizontalList from './HorizontalList';
import Surface from './Surface';
import { Container, Header, Content, Badge, Right, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

function Tag(props) {
    return (
        <Chip icon={props.icon} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>{props.children}</Chip>
    )
}

export default function VerticalCard(props) {
    return (
        <Card style={[{flex: 1}, props.featured && {borderColor:'#FFB400', borderLeftWidth:10}]}>
        <CardItem style={props.featured && {backgroundColor:'#FFEEC7'}}>
            <Left>
                <Thumbnail source={{uri: props.item.image}} />
                <Body>
                    <Text>{props.item.username}</Text>
                    <Text note>{props.item.category}</Text> 
                </Body>
            </Left>

            {props.item.featured &&
            <Right style={{zIndex:5, position:'absolute', right:'0%', top:'-10%'}}>
                <Badge style={{flexDirection:'row', backgroundColor:'#FFB400'}}>
                        <Icon name="star" style={{ fontSize: 15, color: "#fff", lineHeight: 20 }}/>
                        <Text style={{ color: 'white' }}>Featured</Text>
                </Badge>
            </Right>}

        </CardItem>
        <CardItem style={props.featured && {backgroundColor:'#FFEEC7'}}>
        <Body style={{}}>
            <Text>
            {props.item.title}
            </Text>               

            <View style={{flex:1, flexDirection:'row', marginTop:5, flexWrap:'wrap', alignItems:'center',padding:10}}>
                <Tag icon="thumb-up">{props.item.likes}</Tag>
                <Tag icon="thumb-down">{props.item.dislikes}</Tag>
                <Tag style={{alignSelf: 'flex-start'}} icon="account">{props.item.members}</Tag>
            </View>
        </Body>
        </CardItem>
        </Card>
    )
}