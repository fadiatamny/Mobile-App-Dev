import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const searchBox = ({ searchText, setSearchText, search, clearCache, setResults }: any): any => {
  return (
    <TextInput
      style={styles.search}
      placeholder={'Search'}
      onChangeText={async (text: string): Promise<any> => {
        setSearchText(text)
        if (text !== '') {
          search(text)
        } else {
          await clearCache()
          setResults([])
        }
      }}
      value={searchText}
    />
  )
}

const styles = StyleSheet.create({
  search: {
    borderColor: '#2f363c',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: '95%',
    textAlign: 'center',
    fontSize: 28,
    padding: 10,
    marginBottom: 20
  }
})

export default searchBox
