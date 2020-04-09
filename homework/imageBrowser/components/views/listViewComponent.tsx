import React from 'react';
import { Text, View } from 'react-native';

import ListItem from './listItem';

const listViewComponent = ({ data }: any): any => {
	return (
		<View>
			<View>
				{data && data.length !== 0 ? (
					data.map((elem: any, index: number) => (
						<ListItem key={index} item={elem}></ListItem>
					))
				) : (
					<Text> No Results </Text>
				)}
			</View>
		</View>
	);
};

export default listViewComponent;
