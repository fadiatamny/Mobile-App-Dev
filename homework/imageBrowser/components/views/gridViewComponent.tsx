import React from 'react'
import { FlatList } from 'react-native'

import GridItem from './gridItem'

const gridViewComponent = ({
  data,
  selectedBackgroundColor,
  calledScreen,
  navigation
}: any): any => {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }): any => (
        <GridItem
          key={index.toString()}
          item={item}
          selectedBackgroundColor={selectedBackgroundColor}
          calledScreen={calledScreen}
          navigation={navigation}
        >
          {' '}
        </GridItem>
      )}
      numColumns={3}
      keyExtractor={(item): string => item.id.toString()}
    />
  )
}

export default gridViewComponent
