import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import store from './store';

const Stack = createStackNavigator();

import Login from './pages/login/newLogin';
import Home from './pages/home';

const App = (): any => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
