import * as React from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../../utils/Images';
import OutlineButton from '../OutlineButton';
import AuthInput from '../AuthInput';

const SendEmailModal = ({ visible, title, onClose, onSuccess, onChangeText, value }) => {
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => {
                onClose();
            }}
            onBackButtonPress={() => {
                onClose();
            }}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.playCircle}
                    onPress={onClose}
                >
                    <Icon
                        name="close"
                        size={15}
                        style={styles.playIcon}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.bodyWrapper}>
                    <View style={styles.emailInputWrapper}>
                        <AuthInput
                            placeholder='Email'
                            icon={Images.ic_email}
                            value={value}
                            onChangeText={onChangeText}
                            borderType={"roundTop"}
                        />
                    </View>
                    <View style={styles.successButtonWrapper}>
                        <OutlineButton
                            title="Done"
                            loading={false}
                            onPress={onSuccess}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

SendEmailModal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onChangeText: PropTypes.func,
    value: PropTypes.string
}

export default SendEmailModal;