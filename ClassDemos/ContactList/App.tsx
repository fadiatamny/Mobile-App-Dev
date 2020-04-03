import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Fields, requestPermissionsAsync, getContactsAsync } from 'expo-contacts';

function Item({ title, numbers }: any): any {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      {numbers && numbers.length > 0
        ? numbers.map((element: any, i: number) => <Text key={i}> {'\t*\t' + element.number}</Text>)
        : null}
    </View>
  );
}

export default function App(): any {
  const [loading, setLoading] = React.useState(true);
  const [contacts, setContacts] = React.useState(Array<any>());
  const [viewList, setViewList] = React.useState(Array<any>());
  const [searchText, setSearchText] = React.useState('');

  React.useEffect((): any => {
    (async (): Promise<any> => {
      const { status } = await requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await getContactsAsync({
          fields: [Fields.Emails, Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);
          setViewList(data);
          setLoading(false);
        }
      }
    })();
  }, []);

  const filter = (text: string): void => {
    setSearchText(text);
    if (text === '') setViewList(contacts);
    else {
      const newList = contacts.filter((contact) =>
        contact.name.toUpperCase().includes(text.toUpperCase())
      );
      setViewList(newList);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <TextInput
        style={styles.search}
        placeholder={'Search'}
        onChangeText={(text): void => filter(text)}
        value={searchText}
      />
      <View style={styles.content}>
        {loading ? (
          <View style={styles.indicator}>
            <ActivityIndicator size={'large'} color={'#2fcccc'} />
          </View>
        ) : (
          <FlatList
            data={viewList}
            renderItem={({ item }): any => <Item title={item.name} numbers={item.phoneNumbers} />}
            keyExtractor={(item): any => item.id}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    backgroundColor: '#2f363c',
  },
  search: {
    borderColor: '#2f363c',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    fontSize: 28,
    padding: 10,
    marginBottom: 20,
  },
  indicator: {
    backgroundColor: '#2f363c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#6bfedd',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
