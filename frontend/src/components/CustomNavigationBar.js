import React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {translateRouteName} from '../utils/Helpers';

export default function CustomNavigationBar({navigation, previous}) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const route = useRoute();

    return (
        <Appbar.Header style={{}}>
            {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}

            {!previous && <Appbar.Action icon="cog" color="white" onPress={ () => navigation.navigate('Settings') } />}

            <Appbar.Content style={{ alignItems: 'center' }} title="Telerank" subtitle={translateRouteName(route.name)} />

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
    );
}