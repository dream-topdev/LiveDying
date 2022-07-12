import * as React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { scale } from '../../utils/scale';

const InlineContainer = ({ title, actionChild, fontSize = 13, borderRadius = 25 }) => {
    return (
        <View
            style={[styles.container, { borderRadius: scale(borderRadius) }]}
        >
            <Text style={[styles.text, { fontSize: scale(fontSize) }]}>{title}</Text>
            {actionChild}
        </View>
    );
};

InlineContainer.propTypes = {
    title: PropTypes.string,
    actionChild: PropTypes.object.isRequired,
    fontSize: PropTypes.number,
    borderRadius: PropTypes.number
}

export default InlineContainer;