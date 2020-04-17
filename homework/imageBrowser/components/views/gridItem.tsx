import React from 'react'
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'

const windowWidth = Dimensions.get('window').width
const margins = 10

const calculatedSize = (): any => {
  const size = windowWidth / 3
  return { width: size - margins, height: size - margins }
}

const gridItem = ({ item, selectedBackgroundColor, calledScreen, navigation }: any): any => {
  return (
    <TouchableOpacity
      onPress={(): void =>
        navigation.navigate('Image', {
          image: item,
          selectedBackgroundColor,
          calledScreen
        })
      }
    >
      <View style={styles.imageHolder}>
        <Image source={{ uri: item.previewURL }} style={[calculatedSize()]} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageHolder: {
    margin: 5
  }
})

export default gridItem
