import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	ActivityIndicator,
	Button,
	StatusBar,
	AsyncStorage,
} from 'react-native';

import axios from 'axios';
const API_KEY = '###ENV###';

import GridView from './views/gridViewComponent';
import ListView from './views/listViewComponent';

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

const clearData = async (): Promise<any> => {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		console.log('error occured', e);
	}
};

const homeComponent = (): any => {
	const [searchText, setSearchText] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [viewMode, setViewMode] = React.useState('Grid');
	const [results, setResults] = React.useState([]);
	const selectedBackgroundColor = '#2493c7';
	const selectedTextColor = '#e6f0f5';

	const checkCache = async (): Promise<any> => {
		try {
			return (await getData('query')) === searchText;
		} catch (err) {
			console.log(err);
		}
	};
	const search = async (): Promise<any> => {
		if (await checkCache()) {
			setResults(JSON.parse(await getData('search_results')));
			return;
		}
		setLoading(true);
		try {
			const response: any = await axios.get('https://pixabay.com/api/', {
				params: {
					key: API_KEY,
					q: searchText,
				},
			});
			await setData('query', searchText);
			await setData('search_results', JSON.stringify(response.data.hits));
			setResults(response.data.hits);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
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
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Image Browser</Text>
			</View>
			<TextInput
				style={styles.search}
				placeholder={'Search'}
				onChangeText={(text): void => {
					setSearchText(text);
					if (text !== '') search();
					else {
						clearData();
						setResults([]);
					}
				}}
				value={searchText}
			/>
			<View style={styles.navButtons}>
				<View
					style={
						viewMode === 'Grid'
							? { ...styles.button, backgroundColor: selectedBackgroundColor }
							: styles.button
					}
				>
					<Button
						color={viewMode === 'Grid' ? selectedTextColor : selectedBackgroundColor}
						title="Go to List View"
						onPress={(): void => setViewMode('Grid')}
					/>
				</View>
				<View
					style={
						viewMode === 'List'
							? { ...styles.button, backgroundColor: selectedBackgroundColor }
							: styles.button
					}
				>
					<Button
						color={viewMode === 'List' ? selectedTextColor : selectedBackgroundColor}
						title="Go to List View"
						onPress={(): void => setViewMode('List')}
					/>
				</View>
			</View>
			<View style={styles.content}>
				{loading ? (
					<View style={styles.indicator}>
						<ActivityIndicator size={'large'} color={'#2fcccc'} />
					</View>
				) : viewMode === 'Grid' ? (
					<GridView data={results} />
				) : (
					<ListView data={results} />
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
	titleContainer: {
		backgroundColor: '#2493c7',
		width: '100%',
	},
	title: {
		fontSize: 32,
		textAlign: 'center',
		padding: 15,
		color: '#e6f0f5',
	},
	navButtons: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'center',
		textAlign: 'center',
		maxHeight: '6%',
		marginBottom: 15,
		width: '95%',
	},
	button: {
		flex: 1,
		marginRight: 5,
		marginLeft: 5,
		borderRadius: 10,
		borderColor: '#2493c7',
		borderWidth: 1,
		color: '#2493c7',
		alignContent: 'center',
	},
	search: {
		borderColor: '#2f363c',
		borderStyle: 'solid',
		borderBottomWidth: 1,
		width: '95%',
		textAlign: 'center',
		fontSize: 28,
		padding: 10,
		marginBottom: 20,
	},
	content: {
		flex: 1,
	},
	indicator: {
		marginTop: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default homeComponent;
