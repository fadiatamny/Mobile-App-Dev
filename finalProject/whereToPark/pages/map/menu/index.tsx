import React from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import styles from './style';
import { Button } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { fetchFocus, refreshMarkers } from '../actions';
import Axios from 'axios';
import { ENDPOINT, API_KEY } from '../../../constants';
import { setFocus } from '../actions';

const Menu = ({ navigation }: any): any => {
    const dispatch = useDispatch();

    const handleInsert = async (): Promise<void> => {
        try {
            const data = await fetchFocus();
            const res = await Axios.post(`${ENDPOINT}/pin/`, data, {
                headers: {
                    'API-KEY': API_KEY
                }
            })
            dispatch(refreshMarkers());
        } catch (e) {
            console.log(e);
        }
    };

    const handleReposition = async (): Promise<void> => {
        try {
            const data = await fetchFocus();
            dispatch(setFocus(data))
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <React.Fragment>
            <View style={{ ...styles.btn, ...styles.favBtn }}>
                <Button icon={
                    <Entypo
                        name="menu"
                        size={40}
                        color="#fff"
                    />
                }
                    type='clear'
                    onPress={() => { navigation.toggleDrawer() }}
                />
            </View>
            <View style={{ ...styles.btn, ...styles.addBtn }}>
                <Button icon={
                    <Entypo
                        name="plus"
                        size={40}
                        color="#fff"
                    />
                }
                    type='clear'
                    onPress={handleInsert}
                />
            </View>
            <View style={{ ...styles.btn, ...styles.locationBtn }}>
                <Button icon={
                    <MaterialIcon
                        name="my-location"
                        size={40}
                        color="#fff"
                    />
                }
                    type='clear'
                    onPress={handleReposition}
                />
            </View>
        </React.Fragment>
    );
};

export default Menu;