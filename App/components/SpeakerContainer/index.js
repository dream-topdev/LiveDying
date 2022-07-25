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

const SpeakerContainer = ({ thumbnail, speakerName, speakerTopic, removePress }) => {
    return (
        <View style={styles.container} >
            <View style={styles.thumbnailWrapper}>
                <IconButton
                    icon={Images.default_thumbnail}
                    width={scale(80)}
                    height={scale(80)}
                    disabled={true}
                />
            </View>
            <View style={styles.speakerContentWrapper}>
                <View style={styles.speakerContent}>
                    <Text style={styles.speakerName}>{speakerName}</Text>
                    <Text style={styles.speakerTopic}>{speakerTopic}</Text>
                </View>
            </View>
            <View style={styles.removeIconWrapper}>
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

SpeakerContainer.propTypes = {
    thumbnail: PropTypes.any,
    speakerName: PropTypes.string,
    speakerTopic: PropTypes.string,
    removePress: PropTypes.func
}

export default SpeakerContainer;