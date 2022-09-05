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
import IconButton from '../IconButton';

const UploadMethodSelectModal = ({ visible, title, onClose, onClickYoutube, onClickLocal }) => {
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
                    <IconButton
                        icon={Images.ic_youtube}
                        width={64}
                        height={44}
                        onPress={() => {
                            onClickYoutube();
                        }}
                    />
                    <IconButton
                        icon={Images.ic_file_open}
                        width={64}
                        height={40}
                        onPress={() => {
                            onClickLocal();
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

UploadMethodSelectModal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onClickYoutube: PropTypes.func.isRequired,
    onClickLocal: PropTypes.func
}

export default UploadMethodSelectModal;