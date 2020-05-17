import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ title, inner, navigation }: any): any => {
  const selectedBackgroundColor = '#2493c7';
  return (
    <View style={styles.titleContainer}>
      <SafeAreaView style={styles.safeArea} />
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={selectedBackgroundColor}
        translucent
      />
      {inner ? (
        <Button
          buttonStyle={styles.btn}
          icon={<Icon name="arrow-left" size={50} color="white" />}
          onPress={(): void => {
            navigation.navigate('List');
          }}
        />
      ) : null}
      <Text style={inner ? { ...styles.title, ...styles.innerTitle } : styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FF6632'
  },
  titleContainer: {
    backgroundColor: '#FF6632',
    width: '100%',
    maxHeight: '10%',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: '10%',
    paddingLeft: '17%',
    color: '#e6f0f5'
  },
  innerTitle: {
    paddingLeft: '10%'
  },
  btn: {
    backgroundColor: '#FF6632'
  }
});

export default Header;
