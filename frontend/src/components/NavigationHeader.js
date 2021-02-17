import React from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {getRouteInfo, translateRouteName} from '../utils/Helpers';

import NavGradient from './linear-gradients/NavGradient';

export default function NavigationHeader({navigation, previous}) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const route = useRoute();
    const routeInfo = getRouteInfo(route.name);
    
    return (
        <NavGradient style={{paddingBottom:previous && routeInfo.extendHeaderGradient ? 150 : 5}}>
            <Appbar.Header style={{backgroundColor:'transparent',}}>
                {previous ? <Appbar.BackAction color='white' onPress={navigation.goBack} /> : null}

                {!previous && <Appbar.Action icon="cog" color="white" onPress={ () => navigation.navigate('Settings') } />}

                <Appbar.Content color='white' style={{ textColor:'white', color:'white' }} title="Telerank" subtitle={routeInfo.title} />


                {!previous && (
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                        <Appbar.Action icon="dots-vertical" color="white" onPress={openMenu} />
                        }>
                        <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Option 1" />
                        <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Option 2" />
                        <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
                    </Menu>
                )}
            </Appbar.Header>
        </NavGradient>
    );
}