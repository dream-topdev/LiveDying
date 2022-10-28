import React, { forwardRef } from 'react';
import {
    ActivityIndicator,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import Colors from '../../utils/Colors';
import { scale } from '../../utils/scale';


const Loading = forwardRef(({
    color = Colors.secondaryColor,
    size = scale(50)
}, ref) => {
    return (
        <View style={styles.container}>
            < ActivityIndicator
                size={size}
                color={color}
            />
        </View>
    );
});

Loading.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    ref: PropTypes.any,
}

export default Loading;