import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const imageViewComponent = ({ route }: any): any => {
	const image = route.params.image;
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: image.largeImageURL }}
				style={styles.image}
			/>
			<Button
				icon={
					<Icon
						name="arrow-right"
						size={15}
						color="white"
					/>
				}
				title="Button with icon component"
				onPress={(): any => { 
					console.log('hi') 
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		textAlign: 'center'
	},
	image: {
		height: '80%',
		width: '80%'
	}
});

export default imageViewComponent;
