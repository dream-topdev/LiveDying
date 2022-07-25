import * as React from 'react';
import {
    Image,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { scale } from '../../utils/scale';

const IconButton = ({ icon, width = 18, height = 18, marginRight = 0, disabled, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            disabled={disabled}
        >
            <Image
                source={icon}
                style={[
                    {
                        width: scale(width),
                        height: scale(height),
                        marginRight: scale(marginRight)
                    }
                ]}
            />
        </TouchableOpacity>
    );
};

IconButton.propTypes = {
    icon: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number,
    marginRight: PropTypes.number,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
}

export default IconButton;