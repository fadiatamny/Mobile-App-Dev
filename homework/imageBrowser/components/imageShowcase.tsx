import React from 'react';
import { View, Text } from 'react-native';

const imageViewComponent = ({ route }: any): any => {
	const params = route.params;
	return (
		<View>
			<Text>
				{params.title}, {params.url}
			</Text>
		</View>
	);
};

export default imageViewComponent;
