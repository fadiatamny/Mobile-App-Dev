import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const margins = 10;

const calculatedSize = (): any => {
	var size = windowWidth / 3
	return { width: size - margins, height: size - margins }
};

const gridItem = ({ item, navigation }: any): any => {
	return (
		<TouchableOpacity onPress={() =>
			navigation.navigate('Image', { image: item })}
		>
			<View style={{ margin: 5 }}>
				<Image
					source={{ uri: item.previewURL }}
					style={[
						calculatedSize()
					]}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default gridItem;
