import React from 'react';
import { useSelector } from 'react-redux';
import { ImageBackground } from 'react-native';
import LoginModal from './loginModal';
import SignupModal from './signupModal';
import styles from './newStyle';

const image = require('../../assets/splash.png');


const ModalView = ({ navigation }: any): any => {

    const userEmail: string = useSelector((state: any) => state.user.username);
    const [display, setDisplay] = React.useState('Login');

    React.useEffect(() => {
        if (userEmail && userEmail !== '')
            navigation.navigate('Home');
    }, []);

    return (
        <ImageBackground source={image} style={styles.container}>
            {display === 'Login' ?
                <LoginModal setDisplay={setDisplay} navigation={navigation} />
                : <SignupModal setDisplay={setDisplay} navigation={navigation} />
            }
        </ImageBackground>
    );
};

export default ModalView;