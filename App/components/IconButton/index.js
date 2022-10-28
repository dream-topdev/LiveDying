import * as React from 'react';
import {
    Image,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { scale } from '../../utils/scale';

const IconButton = ({ icon,
    width = 18,
    height = 18,
    marginRight = 0,
    overFlow = 'hidden',
    backColor = 'transparent',
    disabled, onPress
}) => {
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
                        backgroundColor: backColor,
                        width: scale(width),
                        height: scale(height),
                        marginRight: scale(marginRight),
                        borderRadius: scale(width / 2),
                        overflow: overFlow
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
    overFlow: PropTypes.string,
    backColor: PropTypes.string
}

export default IconButton;