import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements'

const listItem = ({ item }: any): any => {
	return (
		<ListItem
			key={item.id.toString()}
			title={
				<Text style={styles.title}>{item.tags}</Text>
			}
			subtitle={
				<Text style={styles.subTitle}>{`Views:${item.views}\tLikes:${item.likes}`}</Text>
			}
			leftAvatar={{ source: { uri: item.previewURL }, rounded: true }}
			bottomDivider
		/>
	);
};

const styles = StyleSheet.create({
	title: {
		color: '#155877',
		fontSize: 20
	},
	subTitle: {
		color: '#729AAD'
	}
});

export default listItem;
