import React from 'react';
import Axios from 'axios';

import { ENDPOINT, API_KEY } from '../../constants';
import { View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { login, setFavs } from './actions'

import styles from './style';

const Login = ({navigation}: any) => {
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const userEmail:string = useSelector((state:any)=>state.user.username);
  const dispatch: any = useDispatch();

  React.useEffect(() => {
    if(userEmail && userEmail !== '')
      navigation.navigate('Home');
  });

  const attemtSignup = async (username: string, password: string) => {
    try {
      const res: any = await Axios.post(`${ENDPOINT}/signup`, { username: username, password: password }, {
        headers: {
          'API-KEY': API_KEY
        }
      });
    } catch (e) {
      console.log('Error: ' + e )
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={(username) => setUserName(username)}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button
        title='Login'
        onPress={async () => { await attemptLogin(username, password) }}
      />
      <Button
        title='Signup'
        onPress={async () => { await attemtSignup(username, password) }}
      />
    </View>
  );
};

export default Login;
