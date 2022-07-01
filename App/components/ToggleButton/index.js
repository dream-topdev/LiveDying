import * as React from 'react';
import {
    Text,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';
import Colors from '../../utils/Colors';

const ToggleButton = ({ title, active, onPress}) => {
    return (
        <TouchableOpacity
            style={[styles.container, active && { backgroundColor: Colors.primaryLightColor}]}
            onPress={onPress}
        >
            <Text style={active ? styles.text : styles.inactiveText}>
            {title}
            </Text>
        </TouchableOpacity>
    );
};

ToggleButton.propTypes = {
    title: PropTypes.string,
    active: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
}

export default ToggleButton;