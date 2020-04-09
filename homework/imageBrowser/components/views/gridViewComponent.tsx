import React from 'react';
import { Text, View } from 'react-native';

import GridItem from './gridItem';

const gridViewComponent = ({ data }: any): any => {
	return (
		<View>
			{data && data.length !== 0 ? (
				data.map((elem: any, index: number) => (
					<GridItem key={index} item={elem}></GridItem>
				))
			) : (
				<Text> No Results </Text>
			)}
		</View>
	);
};

export default gridViewComponent;
