import React from 'react';
import { FlatList } from 'react-native';

import GridItem from './gridItem';

const gridViewComponent = ({ data, navigation }: any): any => {

	return (
		<FlatList
			data={data}
			renderItem={({ item, index }) => (
				<GridItem key={index.toString()} item={item} navigation={navigation}></GridItem>
			)}
			numColumns={3}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
};

export default gridViewComponent;
