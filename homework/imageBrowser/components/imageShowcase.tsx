import React from 'react';
import { View, StyleSheet, AsyncStorage, SafeAreaView, StatusBar } from 'react-native';
import { Image, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import Title from './header/titleComponent';

const setData = async (key: string, value: string): Promise<any> => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (e) {
		console.log('save error', e);
	}
};

const getData = async (key: string): Promise<any> => {
	try {
		return await AsyncStorage.getItem(key);
	} catch (e) {
		console.log('error', e);
	}
};

const imageViewComponent = ({ route, navigation }: any): any => {
	const [isFav, setIsFav] = React.useState(false);
	const image = route.params.image;
	const selectedBackgroundColor = route.params.selectedBackgroundColor;
	const calledScreen = route.params.calledScreen;

	React.useEffect((): any => {
		(async (): Promise<any> => {
			let favs = await getData('favs');
			if (favs !== null) {
				favs = JSON.parse(favs);
				favs.forEach((element: any): any => {
					if (element.id === image.id) {
						setIsFav(true);
						return;
					}
				});
			}
		})();
	}, []);

	const addToFavs = async (): Promise<any> => {
		try {
			let favs = await getData('favs');
			if (favs === null) {
				favs = [image];
				setIsFav(true);
			} else if (!isFav) {
				favs = JSON.parse(favs);
				favs.push(image);
				setIsFav(true);
			}
			await setData('favs', JSON.stringify(favs));
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.safeArea} />
			<StatusBar
				barStyle="dark-content"
				hidden={false}
				backgroundColor={selectedBackgroundColor}
				translucent
			/>
			<Title
				navigation={navigation}
				selectedBackgroundColor={selectedBackgroundColor}
				sideScreen
				returnScreen={calledScreen}
			/>
			<View style={styles.content}>
				<Image source={{ uri: image.largeImageURL }} style={styles.image} />
				{!isFav ? (
					<View style={styles.btn}>
						<Button
							buttonStyle={styles.btnStyle}
							icon={<Icon name="heart" size={50} color="white" />}
							title=""
							onPress={async (): Promise<any> => {
								await addToFavs();
							}}
						/>
					</View>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	safeArea: {
		backgroundColor: '#2493c7',
	},
	content: {
		flex: 1,
		width: '100%',
		marginLeft: '20%',
		marginTop: '20%',
	},
	image: {
		height: '80%',
		width: '80%',
	},
	btn: {
		width: '80%'
	},
	btnStyle: {
		backgroundColor: '#2493c7'
	}
});

export default imageViewComponent;
