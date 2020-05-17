import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, TextInput } from 'react-native';
import { searchTracks, setLoading, noTracks } from '../actions';

const searchBox = (): any => {
  const [query, setQuery] = React.useState('');
  const [changeTimeout, setChangeTimeout] = React.useState(0);
  const old = useSelector((state: any) => state.songs.query);

  const queryChange = (text: string): any => {
    if (text === old) return;
    if (changeTimeout) {
      clearTimeout(changeTimeout);
    }
    if (text === '') {
      dispatch(noTracks());
      clearTimeout(changeTimeout);
    } else {
      dispatch(setLoading());
      setChangeTimeout(
        setTimeout(() => {
          dispatch(searchTracks(text));
        }, 1000)
      );
    }
  };

  const dispatch: any = useDispatch();
  return (
    <TextInput
      style={styles.search}
      placeholder={'Search'}
      onChangeText={(text: string): any => {
        setQuery(text);
        queryChange(text);
      }}
      value={query}
    />
  );
};

const styles = StyleSheet.create({
  search: {
    borderColor: '#ff4100',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    color: '#155877',
    width: '100%',
    textAlign: 'center',
    fontSize: 28,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: '#fff3ef'
  }
});

export default searchBox;
