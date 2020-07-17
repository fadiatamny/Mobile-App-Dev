import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import Map from '../map';
import DrawerContent from './drawerContent';
import styles from './style';

const Home = ({ navigation }: any): any => {
    const stackNav = navigation;
    return (
        <Drawer.Navigator drawerStyle={styles.drawer} drawerContent={(props: any) => <DrawerContent {...props} closeDrawer={props.navigation.closeDrawer} stackNavigation={stackNav} />}>
            <Drawer.Screen name="Home" component={Map} />
        </Drawer.Navigator>
    );
};

export default Home;
