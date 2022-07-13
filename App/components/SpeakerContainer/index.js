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

const SpeakerContainer = ({ thumbnail, speakerName, speakerTopic }) => {
    return (
        <View style={styles.container} >
            <View style={styles.thumbnailWrapper}>
                <IconButton
                    icon={Images.default_thumbnail}
                    width={80}
                    height={80}
                    disabled={true}
                />
            </View>
            <View style={styles.speakerContentWrapper}>
                <View style={styles.speakerContent}>
                    {/* <View style={styles.speakerNameWrapper}> */}
                    <Text style={styles.speakerName}>{speakerName}</Text>
                    {/* </View> */}
                    {/* <View style={styles.speakerTopicWrapper}> */}
                    <Text style={styles.speakerTopic}>{speakerTopic}</Text>
                    {/* </View> */}
                </View>
            </View>
            <View style={styles.removeIconWrapper}>
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

SpeakerContainer.propTypes = {
    thumbnail: PropTypes.any,
    speakerName: PropTypes.string,
    speakerTopic: PropTypes.string
}

export default SpeakerContainer;