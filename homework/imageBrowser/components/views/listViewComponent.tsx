import React from 'react';
import { FlatList } from 'react-native';

import ListItem from './listItem';

const listViewComponent = ({ data, navigation }: any): any => {
	return (
		<FlatList
			data={data}
			renderItem={({ item, index }) => (
				<ListItem key={index.toString()} item={item} navigation={navigation}></ListItem>
			)}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
};

export default listViewComponent;
