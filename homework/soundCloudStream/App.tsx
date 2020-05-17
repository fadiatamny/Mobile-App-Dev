import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';

import List from './pages/songsList';
import Recent from './pages/queriesList';

const Stack = createStackNavigator();

export default function App(): any {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="List" component={List} options={{ title: 'Sound Cloud Player' }} />
          <Stack.Screen name="Recent" component={Recent} options={{ title: 'Recent Queries' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
