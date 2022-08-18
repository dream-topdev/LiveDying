import * as React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import Images from '../../utils/Images';
import { styles } from './styles';
import { scale } from '../../utils/scale';

const SongItemContainer = ({ thumbnail, songTitle, songArtist, songTime, removePress }) => {
    return (
        <View style={styles.container} >
            <View style={styles.thumbnailWrapper}>
                <TouchableOpacity
                    style={styles.container}
                    // onPress={onPress}
                    disabled={true}
                >
                    <Image
                        source={{ uri: thumbnail }}
                        style={[
                            {
                                width: scale(100),
                                height: scale(100),
                                marginRight: scale(0)
                            }
                        ]}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{songTitle}</Text>
                <Text style={styles.songArtist}>{songArtist}</Text>
                <Text style={styles.songTime}>{songTime}</Text>
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

SongItemContainer.propTypes = {
    thumbnail: PropTypes.string,
    songTitle: PropTypes.string,
    songArtist: PropTypes.string,
    songTime: PropTypes.string,
    removePress: PropTypes.func
}

export default SongItemContainer;