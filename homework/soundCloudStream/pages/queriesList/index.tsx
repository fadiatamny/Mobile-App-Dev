import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, Text, View, StyleSheet } from 'react-native';

import Header from '../../shared/header';

const Queries = ({ navigation }: any): any => {
  const data: string[] = useSelector((state: any) => state.songs.queries);
  let count = 1;
  return (
    <View style={styles.container}>
      <Header title="Recent Querries" inner navigation={navigation}></Header>
      <View style={styles.content}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item, index }): any => (
              <Text>
                {' '}
                {index + 1}.{item}{' '}
              </Text>
            )}
            key={(count++).toString()}
          />
        ) : (
          <Text style={styles.noRes}> No Queries </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  noRes: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: '50%'
  }
});
export default Queries;
