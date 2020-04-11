import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const title = ({
	getData,
	setSearchText,
	navigation,
	selectedBackgroundColor,
	sideScreen,
	returnScreen,
}: any): any => {
	const getFavs = async (): Promise<any> => {
		try {
			let favs = await getData('favs');
			favs = JSON.parse(favs);
			setSearchText('');
			navigation.navigate('Favorites', {
				results: favs,
				selectedBackgroundColor,
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View style={styles.titleContainer}>
			{sideScreen ? (
				<Button
					buttonStyle={styles.btn}
					icon={<Icon name="arrow-left" size={50} color="white" />}
					onPress={(): void => {
						navigation.navigate(returnScreen);
					}}
				/>
			) : null}
			<Text style={!sideScreen ? styles.title : styles.sideTitle}>Image Browser</Text>
			{!sideScreen ? (
				<Button
					buttonStyle={styles.btn}
					icon={<Icon name="heart" size={50} color="white" />}
					onPress={async (): Promise<any> => {
						await getFavs();
					}}
				/>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		backgroundColor: '#2493c7',
		width: '100%',
		maxHeight: '10%',
		flex: 1,
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 32,
		textAlign: 'center',
		paddingTop: 15,
		paddingBottom: 15,
		paddingRight: '10%',
		paddingLeft: '25%',
		color: '#e6f0f5',
	},
	sideTitle: {
		fontSize: 32,
		textAlign: 'center',
		paddingTop: 15,
		paddingBottom: 15,
		paddingRight: '25%',
		paddingLeft: '12%',
		color: '#e6f0f5',
	},
	btn: {
		backgroundColor: '#2493c7',
	},
});

export default title;
