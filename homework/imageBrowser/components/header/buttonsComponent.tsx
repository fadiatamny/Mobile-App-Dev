import React from 'react'
import { StyleSheet, Button, View } from 'react-native'

const buttons = ({
  viewMode,
  setViewMode,
  selectedTextColor,
  selectedBackgroundColor
}: any): any => {
  return (
    <View style={styles.navButtons}>
      <View
        style={
          viewMode === 'Grid'
            ? { ...styles.button, backgroundColor: selectedBackgroundColor }
            : styles.button
        }
      >
        <Button
          color={viewMode === 'Grid' ? selectedTextColor : selectedBackgroundColor}
          title="Go to Grid View"
          onPress={(): void => setViewMode('Grid')}
        />
      </View>
      <View
        style={
          viewMode === 'List'
            ? { ...styles.button, backgroundColor: selectedBackgroundColor }
            : styles.button
        }
      >
        <Button
          color={viewMode === 'List' ? selectedTextColor : selectedBackgroundColor}
          title="Go to List View"
          onPress={(): void => setViewMode('List')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navButtons: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    textAlign: 'center',
    maxHeight: '6%',
    marginBottom: 15,
    width: '95%'
  },
  button: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
    borderColor: '#2493c7',
    borderWidth: 1,
    color: '#2493c7',
    alignContent: 'center'
  }
})

export default buttons
