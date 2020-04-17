import React from 'react'
import { FlatList } from 'react-native'

import ListItem from './listItem'

const listViewComponent = ({
  data,
  selectedBackgroundColor,
  calledScreen,
  navigation
}: any): any => {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }): any => (
        <ListItem
          key={index.toString()}
          item={item}
          selectedBackgroundColor={selectedBackgroundColor}
          calledScreen={calledScreen}
          navigation={navigation}
        >
          {' '}
        </ListItem>
      )}
      keyExtractor={(item): string => item.id.toString()}
    />
  )
}

export default listViewComponent
