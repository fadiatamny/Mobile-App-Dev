import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import SongSearch from '../../../models/songSearch';

const Item = ({ item }: { children: never[]; item: SongSearch }): any => {
  return (
    <ListItem
      containerStyle={styles.item}
      key={item.id.toString()}
      title={<Text style={styles.title}>{item.title}</Text>}
      subtitle={
        <Text style={styles.subTitle}>
          {`Artist: ${item.user.username}\tPlaybacks: ${item.playback_count}`}
        </Text>
      }
      leftAvatar={{
        source: {
          uri: item.artwork_url
            ? `${item.artwork_url}`
            : 'https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png'
        },
        rounded: true
      }}
      bottomDivider
    />
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#155877',
    fontSize: 20
  },
  subTitle: {
    color: '#729AAD'
  },
  item: {
    backgroundColor: '#fff3ef'
  }
});

export default Item;
