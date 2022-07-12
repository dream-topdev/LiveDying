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

const SongItemContainer = ({ thumbnail, songTitle, songArtist, songTime }) => {
    return (
        <View style={styles.container} >
            <View style={styles.thumbnailWrapper}>
                <IconButton
                    icon={Images.default_thumbnail}
                    width={scale(100)}
                    height={scale(100)}
                    disabled={true}
                />
            </View>
            <View style={styles.itemContent}>
                <View style={styles.songInfo}>
                    <Text style={styles.songTitle}>{songTitle}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.songArtist}>{songArtist}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.songTime}>{songTime}</Text>
                </View>
                <View style={styles.removeIcon}>
                    <IconButton
                        icon={Images.ic_remove}
                        width={scale(24)}
                        height={scale(24)}
                        disabled={true}
                    />
                </View>
            </View>
        </View >
    );
};

SongItemContainer.propTypes = {
    thumbnail: PropTypes.any,
    songTitle: PropTypes.string,
    songArtist: PropTypes.string,
    songTime: PropTypes.string
}

export default SongItemContainer;