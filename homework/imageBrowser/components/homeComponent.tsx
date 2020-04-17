import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  AsyncStorage
} from 'react-native'

import { API_KEY, ENDPOINT } from 'react-native-dotenv'

import axios from 'axios'
import Title from './header/titleComponent'
import SearchBox from './header/searchBoxComponent'
import Buttons from './header/buttonsComponent'
import GridView from './views/gridViewComponent'
import ListView from './views/listViewComponent'

const setData = async (key: string, value: string): Promise<any> => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log('save error', e)
  }
}

const getData = async (key: string): Promise<any> => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.log('error', e)
  }
}

const clearCache = async (): Promise<any> => {
  try {
    await setData('query', '')
    await setData('search_results', '[]')
  } catch (e) {
    console.log('error occured', e)
  }
}

const homeComponent = ({ navigation }: any): any => {
  const [searchText, setSearchText] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [viewMode, setViewMode] = React.useState('Grid')
  const [results, setResults] = React.useState([])
  const selectedBackgroundColor = '#2493c7'
  const selectedTextColor = '#e6f0f5'

  const checkCache = async (text: string): Promise<any> => {
    try {
      return (await getData('query')) === text
    } catch (err) {
      console.log(err)
    }
  }

  const search = async (text: string): Promise<any> => {
    setLoading(true)

    if (await checkCache(text)) {
      setResults(JSON.parse(await getData('search_results')))
    } else
      try {
        const response: any = await axios.get(ENDPOINT, {
          params: {
            key: API_KEY,
            q: text
          }
        })
        await setData('query', text)
        await setData('search_results', JSON.stringify(response.data.hits))
        setResults(response.data.hits)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={selectedBackgroundColor}
        translucent
      />
      <Title
        setResults={setResults}
        getData={getData}
        setSearchText={setSearchText}
        navigation={navigation}
        selectedBackgroundColor={selectedBackgroundColor}
        sideScreen={false}
        returnScreen={'Home'}
      />
      <SearchBox
        searchText={searchText}
        setSearchText={setSearchText}
        search={search}
        clearCache={clearCache}
        setResults={setResults}
      />
      <Buttons
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedTextColor={selectedTextColor}
        selectedBackgroundColor={selectedBackgroundColor}
      />

      <View style={styles.content}>
        {loading ? (
          <View style={styles.indicator}>
            <ActivityIndicator size={'large'} color={'#2fcccc'} />
          </View>
        ) : results.length > 0 ? (
          viewMode === 'Grid' ? (
            <GridView
              data={results}
              selectedBackgroundColor={selectedBackgroundColor}
              navigation={navigation}
              calledScreen={'Home'}
            />
          ) : (
            <ListView
              data={results}
              selectedBackgroundColor={selectedBackgroundColor}
              navigation={navigation}
              calledScreen={'Home'}
            />
          )
        ) : (
          <Text style={styles.noRes}> No Results </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  safeArea: {
    backgroundColor: '#2493c7'
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
  }
})

export default homeComponent
