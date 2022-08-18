import * as React from 'react';
import {
    Text,
    TextInput,
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
    editable = false,
    placeholder = '',
    onChangeText,
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
            <TextInput
                editable={editable}
                selectTextOnFocus={editable}
                placeholder={placeholder}
                onChangeText={onChangeText}
                style={[
                    styles.text,
                    { fontSize: scale(fontSize) }
                ]}
            >
                {title}
            </TextInput>
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
    paddingRight: PropTypes.number,
    editable: PropTypes.bool,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func
}

export default InlineContainer;