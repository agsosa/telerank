import React from 'react';
import { View } from 'react-native';
import NavGradient from '../components/linear-gradients/NavGradient'
import { Image } from 'react-native';
import { Container, Header, Content, Right, Badge, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

export default function EntryDetailsScreen({route, navigation}) {
    const data = route.params;
    data.featured = true;
            
    //{ data && <Text>{JSON.stringify(data)}</Text>}
    console.log(data);

    return (
      <View style={{ zIndex:10, top:'-30%', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
          <Card key={data._id} style={{width:'90%', flex: 1}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: data.image}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>{data.type} / {data.category}</Text>
                </Body>
              </Left>
              {data.featured &&
                    <Right style={{zIndex:5, position:'absolute', right:'0%', top:'-10%'}}>
                        <Badge style={{flexDirection:'row', backgroundColor:'#FFB400'}}>
                                <Icon name="star" style={{ fontSize: 15, color: "#fff", lineHeight: 20 }}/>
                                <Text style={{ color: 'white' }}>Featured</Text>
                        </Badge>
                    </Right>}
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: data.image}} style={{height: 200, width: 200, flex: 0}}/>
                <Text>
                  xd
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
      </View>
    );
  }