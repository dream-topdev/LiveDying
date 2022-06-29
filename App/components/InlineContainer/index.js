import * as React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

const InlineContainer = ({ title, actionChild}) => {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text}>{title}</Text>
            {actionChild}
        </View>
    );
};

InlineContainer.propTypes = {
    title: PropTypes.string,
    actionChild: PropTypes.object.isRequired,
}

export default InlineContainer;