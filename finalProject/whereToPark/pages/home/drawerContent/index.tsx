import React from 'react';
import { Text, View, Platform } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import ListView from './listView';
import { catImage } from './cats';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LOGOUT } from '../../../services/redux/types';
import ModalView from './modal';

const DrawerContent = ({stackNavigation, closeDrawer}: any): any => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const image = catImage();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleLogout = (): void => {
    dispatch({
      type: LOGOUT
    });
    stackNavigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ModalView modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={styles.profileView}>
        <ListItem
          leftAvatar={{ source: image }}
          title={<Text style={styles.nameText}>{user.name}</Text>}
          containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }}
        />
      </View>
      <View style={styles.logoutBtn}>
        <Button icon={
          <Icon
            name="log-out"
            size={25}
            color="#284994"
          />
        }
          type='clear'
          onPress={handleLogout}
        />
      </View>
      <Text style={styles.favText}>Favorite Parking Locations: </Text>
      <ListView data={user.favs ? user.favs : []} closeDrawer={closeDrawer} />
      <View style={styles.infoBtn}>
        <Button icon={
          <Ionicons
            name={Platform.OS === 'ios' ? "ios-information-circle" : "information-circle"}
            size={40}
            color="#284994"
          />
        }
          type='clear'
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
    </View>
  );
};

export default DrawerContent;
