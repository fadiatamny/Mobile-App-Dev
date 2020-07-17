import React from 'react'
import { FlatList } from 'react-native'
import { Divider } from 'react-native-elements';

import Item from './item'

const ListView = ({ data, closeDrawer }: any): any => {
    return (
        <FlatList
            data={data}
            renderItem={({ item, index }): any => (
                <>
                    <Item key={index.toString()} item={item} closeDrawer={closeDrawer} />
                    <Divider style={{ backgroundColor: 'blue' }} />
                </>
            )}
            keyExtractor={(item): string => Math.floor(item.longitude * 100000000000 + item.latitude * 100000000000).toString()}
        />
    )
}

export default ListView
