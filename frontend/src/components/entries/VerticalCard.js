import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View} from 'react-native';
import { Badge, Right, Card, CardItem, Thumbnail, Text, Icon, Left, Body } from 'native-base';
import Tag from '../Tag.js'

export default function VerticalCard(props) {
    const navigation = useNavigation();

    return (
        <Card style={[{flex: 1}, props.featured && {borderColor:'#FFB400', borderLeftWidth:10}]} onPress={() => console.log("test") }>
            <CardItem style={props.featured && {backgroundColor:'#FFEEC7'}}>
                <Left>
                    <Thumbnail source={{uri: props.item.image}} />
                    <Body>
                        <Text>{props.item.username}</Text>
                        <Text note>{props.item.type} / {props.item.category}</Text> 
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