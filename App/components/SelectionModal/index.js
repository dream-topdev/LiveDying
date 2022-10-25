import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { styles } from './styles';
import { scale, scaleVertical } from '../../utils/scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleButton from '../ToggleButton';


const SelectionModal = ({
    visible,
    title,
    itemList,
    onClose,
    onPress,
    activeItem
}) => {
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
                        size={scale(15)}
                        style={styles.playIcon}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {
                        itemList.map(d => (
                            <View key={d} style={styles.toggleWrapper}>
                                <ToggleButton
                                    title={d}
                                    onPress={() => onPress(d, title)}
                                    active={d == activeItem}
                                />
                            </View>
                        ))
                    }
                </View>
            </View>
        </Modal>
    );
};

SelectionModal.propTypes = {
    visible: PropTypes.bool,
    activeItem: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    itemList: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    title: PropTypes.string
}

export default SelectionModal;