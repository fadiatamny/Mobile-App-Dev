import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';

import Title from './header/titleComponent';
import GridView from './views/gridViewComponent';

const favoritesShowcase = ({ route, navigation }: any): any => {
	const results = route.params.results === null ? [] : route.params.results;
	const selectedBackgroundColor = route.params.selectedBackgroundColor;
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
				returnScreen={'Home'}
			/>
			<View style={styles.content}>
				{results.length > 0 ? (
					<GridView
						data={results}
						selectedBackgroundColor={selectedBackgroundColor}
						navigation={navigation}
						calledScreen={'Favorites'}
					/>
				) : (
					<Text style={styles.noRes}> No Favorites </Text>
				)}
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
		backgroundColor: '#1c5470',
	},
	content: {
		flex: 1,
		width: '100%',
	},
	noRes: {
		textAlign: 'center',
		fontSize: 28,
		marginTop: '50%',
	},
});

export default favoritesShowcase;
