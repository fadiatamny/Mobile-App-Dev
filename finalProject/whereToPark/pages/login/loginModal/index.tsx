import React from 'react';
import Axios from 'axios';
import { View, Text, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../style';

import { login, setFavs } from '../actions';
import { ENDPOINT, API_KEY } from '../../../constants';

const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const LoginModal = ({ setDisplay, navigation }: any): any => {
  const [error, setError] = React.useState('');
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch: any = useDispatch();

  const handleChange = (text: string, setFunction: any): void => {
    if (!text) setError('Empty Fields');
    else {
      setFunction(text);
      setError('');
    }
  };

  const attemptLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      if (error !== '') setError('');
      if (username === '') {
        setError('Empty Username Field');
        setLoading(false);
        return;
      }

      if (password === '') {
        setError('Empty Password Field');
        setLoading(false);
        return;
      }

      if (!validateEmail(username)) {
        setError('Please Insert A valid Email');
        setLoading(false);
        return;
      }

      let res: any = await Axios.post(
        `${ENDPOINT}/login`,
        { username: username.toLowerCase(), password },
        {
          headers: {
            'API-KEY': API_KEY
          }
        }
      );
      dispatch(login(res.data.username, res.data.name));
      res = await Axios.get(`${ENDPOINT}/user/${res.data.username}/pins`, {
        headers: {
          'API-KEY': API_KEY
        }
      });
      dispatch(setFavs(res.data));
      setLoading(false);
      navigation.navigate('Home');
    } catch (e) {
      console.log('Error: ' + e);
      setError('Incorrect Login Details');
      setLoading(false);
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Welcome To WhereToPark</Text>
        <Text style={styles.modalSubText}>Please login</Text>
        <Input
          defaultValue={username}
          onChangeText={(text: string): void => handleChange(text, setUserName)}
          placeholder="Email"
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          leftIcon={<MatIcon name="email" size={20} color="#6986c9" />}
        />
        <Input
          defaultValue={password}
          onChangeText={(text: string): void => handleChange(text, setPassword)}
          placeholder="Password"
          errorStyle={styles.errorText}
          errorMessage={error}
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          secureTextEntry
          leftIcon={<Icon name="lock" size={20} color="#6986c9" />}
        />

        <Button
          title="Login"
          containerStyle={styles.btn}
          onPress={(): any =>
            setTimeout(() => {
              attemptLogin(username, password);
            }, 500)
          }
        />
        <TouchableOpacity onPress={(): void => setDisplay('Signup')}>
          <Text style={styles.tinyText}>Don{"'"}t have an account? Click Here to Signup</Text>
        </TouchableOpacity>
        {loading ? (
          <View style={styles.indicator}>
            <ActivityIndicator size={'large'} color={'#002e94'} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default LoginModal;
