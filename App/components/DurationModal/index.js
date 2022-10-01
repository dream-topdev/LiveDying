import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { styles } from './styles';
import { scale, scaleVertical } from '../../utils/scale';
import Colors from '../../utils/Colors';
import ApplicationStyles from '../../utils/ApplicationStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleButton from '../ToggleButton';
import { act } from 'react-test-renderer';

const DurationModal = ({ visible, onClose, onPress, activeItem }) => {
    const durations = ["Everyday", "Once a week", "Once a month"];
    const [active, setActive] = useState(activeItem);
    
    useEffect(() => {
        console.log('selected the other',active)
        setActive(activeItem)
    }, [active]);

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
                    <Text style={styles.title}>{'Choose Duration'}</Text>
                    {durations.map(d => (
                        <View key={d} style={styles.toggleWrapper}>
                            <ToggleButton
                                title={d}
                                onPress={() => {
                                    setActive(d)
                                    setTimeout(() => {
                                        onPress()
                                    }, 100);
                                }}
                                active={d == active}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </Modal>
    );
};

DurationModal.propTypes = {
    visible: PropTypes.bool,
    activeItem: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onPress: PropTypes.func
}

export default DurationModal;