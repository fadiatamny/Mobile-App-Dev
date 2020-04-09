import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/homeComponent';
import ImageShowcase from './components/imageShowcase';

const Stack = createStackNavigator();

const App = (): any => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ title: 'Search', headerShown: false }}
				/>
				<Stack.Screen name="Image" component={ImageShowcase} options={{ title: '' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
