import React from 'react';
import { View, Text, Modal, Linking, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './style';

const ModalView = ({ modalVisible, setModalVisible }: any): any => {
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Welcome To WhereToPark</Text>
                        <Text style={styles.modalSubText}>The app has 3 basic functionalities:</Text>
                        <Text style={styles.modalSubList}>1. Add free parking location to the map</Text>
                        <Text style={styles.modalSubList}>2. View and manage favorite parking spots</Text>
                        <Text style={styles.modalSubList}>3. Ability to navigate to free parking spots</Text>
                        <Text style={styles.modalSubText}>You are currently in the Faviorites menu.</Text>
                        <Text style={styles.modalSubText}>Clicking on a marker would give a new menu with options</Text>

                        <Button
                            title="Close"
                            buttonStyle={styles.btn}
                            onPress={(): void => setModalVisible(!modalVisible)}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default ModalView;