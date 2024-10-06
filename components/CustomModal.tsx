import React from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({isModalVisible, onPressBackDrop, children}: any) => {
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={isModalVisible}
      onBackdropPress={onPressBackDrop}
      statusBarTranslucent={true}
      avoidKeyboard={true}>
      <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default CustomModal;
