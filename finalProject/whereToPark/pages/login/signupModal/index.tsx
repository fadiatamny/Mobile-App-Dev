import React from 'react';
import Axios from 'axios';
import { View, Text, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../style';

import { login } from '../actions';
import { ENDPOINT, API_KEY } from '../../../constants';

const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const LoginModal = ({ setDisplay, navigation }: any): any => {
  const [error, setError] = React.useState('');
  const [username, setUserName] = React.useState('');
  const [name, setName] = React.useState('');
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

  const attemtSignup = async (username: string, password: string, name: string) => {
    try {
      setLoading(true);
      if (error !== '') setError('');

      if (!validateEmail(username)) {
        setError('Please Insert A valid Email');
        setLoading(false);
        return;
      }

      await Axios.post(
        `${ENDPOINT}/signup`,
        { username: username.toLowerCase(), password, name },
        {
          headers: {
            'API-KEY': API_KEY
          }
        }
      );
      dispatch(login(username, name));
      setLoading(false);
      navigation.navigate('Home');
    } catch (e) {
      console.log('Error: ' + e);
      setError('Sorry! an error occured. Please try again');
      setLoading(false);
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Welcome To WhereToPark</Text>
        <Text style={styles.modalSubText}>Please Signup</Text>
        <Input
          defaultValue={name}
          onChangeText={(text: string): void => handleChange(text, setName)}
          placeholder="Name"
          containerStyle={styles.input}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="user" size={20} color="#6986c9" />}
        />
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
          title="Signup"
          containerStyle={styles.btn}
          onPress={(): any =>
            setTimeout(() => {
              attemtSignup(username, password, name);
            }, 500)
          }
        />
        <TouchableOpacity onPress={(): void => setDisplay('Login')}>
          <Text style={styles.tinyText}>Already have an account? Click Here to Login</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.signupIndicator}>
          <ActivityIndicator size={'large'} color={'#002e94'} />
        </View>
      ) : null}
    </View>
  );
};

export default LoginModal;
