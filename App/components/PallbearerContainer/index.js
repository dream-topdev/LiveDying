import * as React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import Images from '../../utils/Images';
import { styles } from './styles';
import { scale } from '../../utils/scale';
import Colors from '../../utils/Colors';

const PallbearerContainer = ({ thumbnail, name, onPress, removePress }) => {
    return (
        <View style={styles.container} >
            <View style={thumbnail == null ? styles.thumbnailWrapper : {
                height: scale(80),
                width: scale(80),
                overflow: 'hidden',
                borderColor: Colors.primaryColor,
                borderWidth: 4,
                borderRadius: scale(80) / 2,
                paddingRight: scale(20)
            }}>
                <IconButton
                    icon={thumbnail !== null ? { uri: thumbnail } : Images.default_avatar}
                    width={scale(79)}
                    height={scale(79)}
                    disabled={false}
                    onPress={onPress}
                />
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.removeIcon}>
                <IconButton
                    icon={Images.ic_remove}
                    width={scale(24)}
                    height={scale(24)}
                    onPress={removePress}
                    disabled={false}
                />
            </View>
        </View >
    );
};

PallbearerContainer.propTypes = {
    thumbnail: PropTypes.any,
    name: PropTypes.string,
    onPress: PropTypes.func,
    removePress: PropTypes.func
}

export default PallbearerContainer;