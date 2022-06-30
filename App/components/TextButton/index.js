import * as React from 'react';
import {
    Text,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

const TextButton = ({ title, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Text style={styles.text}>
            {title}
            </Text>
        </TouchableOpacity>
    );
};

TextButton.propTypes = {
    title: PropTypes.string,
    underline: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
}

export default TextButton;