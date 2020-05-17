import React from 'react';
import { useSelector } from 'react-redux';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Audio } from 'expo-av';
import { API_KEY } from 'react-native-dotenv';
import { Button } from 'react-native-elements';

import Header from '../../shared/header';
import Item from './listItem';
import SearchBar from './searchBar';
import SongSearch from '../../models/songSearch';

const List = ({ navigation }: any): any => {
  const data: SongSearch[] = useSelector((state: any) => state.songs.tracks);
  const loading: boolean = useSelector((state: any) => state.songs.isLoading);
  const [audioPlayer] = React.useState(new Audio.Sound());

  const playSong = async (stream: URL): Promise<any> => {
    await audioPlayer.unloadAsync();
    await audioPlayer.loadAsync({ uri: `${stream}?client_id=${API_KEY}` });
    await audioPlayer.playAsync();
  };

  return (
    <View style={styles.container}>
      <Header title="Sound Cloud Player" navigation={navigation} />
      <SearchBar />
      <View style={styles.content}>
        {loading ? (
          <View style={styles.indicator}>
            <ActivityIndicator size={'large'} color={'#FF6632'} />
          </View>
        ) : data.length > 0 ? (
          <View>
            <FlatList
              data={data}
              renderItem={({ item, index }: { item: SongSearch; index: number }): any => (
                <TouchableOpacity
                  onPress={async (): Promise<void> => await playSong(item.stream_url)}
                >
                  <Item key={index.toString()} item={item}></Item>
                </TouchableOpacity>
              )}
              keyExtractor={(item): string => item.id.toString()}
            />
          </View>
        ) : (
          <Text style={styles.noRes}> No Results </Text>
        )}
      </View>
      <Button
        buttonStyle={styles.btn}
        title="Recent Queries"
        onPress={(): void => {
          navigation.navigate('Recent');
        }}
      />
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
  indicator: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noRes: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: '50%'
  },
  btn: {
    backgroundColor: '#FF6632',
    width: '100%'
  }
});

export default List;
