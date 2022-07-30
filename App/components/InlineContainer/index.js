import * as React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { scale } from '../../utils/scale';
import Colors from '../../utils/Colors';

const InlineContainer = ({
    title,
    actionChild,
    backgroundColor = Colors.textInputBackground,
    fontSize = 13,
    borderRadius = 25,
    paddingRight = 17,
    paddingLeft = 17 }) => {
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: backgroundColor,
                    borderRadius: scale(borderRadius),
                    paddingLeft: scale(paddingLeft),
                    paddingRight: scale(paddingRight)
                }]}
        >
            <Text style={[styles.text, { fontSize: scale(fontSize) }]}>{title}</Text>
            {actionChild}
        </View>
    );
};

InlineContainer.propTypes = {
    title: PropTypes.string,
    actionChild: PropTypes.object,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    borderRadius: PropTypes.number,
    paddingleq: PropTypes.number,
    paddingRight: PropTypes.number
}

export default InlineContainer;