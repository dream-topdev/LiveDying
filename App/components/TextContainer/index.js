import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import Colors from '../../utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';


const TextContainer = ({ text, onPress, color = Colors.primaryColor, close = true }) => {
    return (
        <TouchableOpacity
            style={[styles.container, {
                borderColor: color
            }]}
            onPress={() => {
                onPress();
            }}
        >
            <Text
                style={[styles.content, {
                    color
                }]}>
                {text}
            </Text>
            {
                close &&
                < Icon
                    name={'close'}
                    style={[styles.closeIcon, {
                        color,
                    }]}
                    onPress={() => {
                        console.log('clickethe close button')
                    }}
                />
            }
        </TouchableOpacity>
    )
}
TextContainer.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    color: PropTypes.any,
    close: PropTypes.bool
}

export default TextContainer;