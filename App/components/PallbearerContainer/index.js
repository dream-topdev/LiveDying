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

const PallbearerContainer = ({ thumbnail, name}) => {
    return (
        <View style={styles.container} >
            <View style={styles.thumbnailWrapper}>
                <IconButton
                    icon={Images.default_thumbnail}
                    width={scale(79)}
                    height={scale(79)}
                    disabled={true}
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
                    disabled={true}
                />
            </View>
        </View >
    );
};

PallbearerContainer.propTypes = {
    thumbnail: PropTypes.any,
    name: PropTypes.string
}

export default PallbearerContainer;