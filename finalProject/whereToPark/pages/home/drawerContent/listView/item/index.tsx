import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

import { removeFav } from '../../../../login/actions';
import { setFocus } from '../../../../map/actions';

const Item = ({ item, closeDrawer }: any): any => {
  const username = useSelector((state: any) => state.user.username);
  const pins = useSelector((state: any) => state.user.favs);
  const dispatch = useDispatch();

  const handleRemove = ():void => {
    const array = pins.filter((elem: any) => elem.longitude !== item.longitude && elem.latitude !== item.latitude);
    dispatch(removeFav(username,array));
  }

  return (
    <View >
      <TouchableOpacity
        onPress={(): void => { dispatch(setFocus(item)); closeDrawer();}
        }
      >
        <ListItem
          key={Math.floor(item.longitude * 100000000000 + item.latitude * 100000000000).toString()}
          title={<Text style={styles.title}>{item.name}</Text>}
          subtitle={<View><Text style={styles.subTitle}>{item.city}-{item.country}</Text></View>}
          containerStyle={{ backgroundColor: 'rgba(255,255,255,0)' }}
        />
      </TouchableOpacity>
      <View style={styles.trash}>
        <Button icon={
          <Icon
            name="trash"
            size={20}
            color="#284994"
          />
        }
          type='clear'
          onPress={handleRemove}
      />
      </View >
    </View>
  )
}

export default Item;
