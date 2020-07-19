import React from 'react';
import { FlatList, Text } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';

import styles from './style';
import Item from './item';

const ListView = ({ data, closeDrawer }: any): any => {
  return (
    <>
      {data.length ? (
        <FlatList
          data={data}
          renderItem={({ item, index }): any => (
            <>
              <Item key={index.toString()} item={item} closeDrawer={closeDrawer} />
              <Divider style={styles.divider} />
            </>
          )}
          keyExtractor={(item): string =>
            Math.floor(item.longitude * 100000000000 + item.latitude * 100000000000).toString()
          }
        />
      ) : (
        <ListItem
          key={'NoElementsKey'}
          title={<Text style={styles.title}>There are no items</Text>}
        />
      )}
    </>
  );
};

export default ListView;
