import * as React from 'react';
import {
    Text,
    TextInput,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { scale } from '../../utils/scale';
import Colors from '../../utils/Colors';

const LabelInputNumber = ({
    value,
    title,
    onChangeText,
    backgroundColor = Colors.textInputBackground,
    fontSize = 16,
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
            <Text style={styles.title}>{title}</Text>
            <View style={{
                paddingHorizontal: scale(10)
            }}>
                <TextInput
                    keyboardType='numeric'
                    defaultValue={'0'}
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={2}
                    textAlign={'center'}
                    style={[
                        styles.text,
                        { fontSize: scale(fontSize) }
                    ]}
                />
            </View>
        </View>
    );
};

LabelInputNumber.propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    borderRadius: PropTypes.number,
    paddingleq: PropTypes.number,
    paddingRight: PropTypes.number,
    onChangeText: PropTypes.func,
    value: PropTypes.string
}

export default LabelInputNumber;