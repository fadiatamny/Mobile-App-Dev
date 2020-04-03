import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, ActivityIndicator, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts'

function Item({ title, numbers }: any) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      {
        numbers && numbers.length > 0 ? 
        numbers.map((element:any) => <Text> {"\t*\t" + element.number}</Text>)
        :         null

      }
    </View>
  );
}

export default function App(props: any) {
  const [loading, setLoading] = React.useState(true);
  const [contacts, setContacts] = React.useState(Array<Contacts.Contact>());
  const [viewList, setViewList] = React.useState(Array<Contacts.Contact>());
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers] });
        if (data.length > 0) {
          setContacts(data);
          setViewList(data);
          setLoading(false);
        }
      }
    })();
  }, []);

  let filter = (text: string) => {
    setSearchText(text);
    if (text == '') setViewList(contacts);
    else {
      const newList = contacts.filter(contact => contact.name.toUpperCase().includes(text.toUpperCase()));
      setViewList(newList);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <TextInput style={styles.search} placeholder={'Search'}
        onChangeText={text => filter(text)}
        value={searchText} />
      <View style={styles.content}>
        {loading ?
          (<View style={styles.indicator}>
            <ActivityIndicator size={'large'} color={'#2fcccc'} />
          </View>)
          :
          (<FlatList
            data={viewList}
            renderItem={({ item }) => <Item title={item.name} numbers={item.phoneNumbers} />}
            keyExtractor={item => item.id}
          />)
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    backgroundColor: '#2f363c'
  },
  search: {
    borderColor: '#2f363c',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    fontSize: 28,
    padding: 10,
    marginBottom: 20
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
    marginHorizontal: 16
  },
  title: {
    fontSize: 32,
  },
});
