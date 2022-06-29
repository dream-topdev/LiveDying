import * as React from 'react';
import {
    View,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';

const Avatar = ({ source, showBadge = true, badgeActive = true, size="lg"}) => {
    const sizeStyle = (size === "lg") ? styles.sizelg : styles.sizemd;
    const badgeStyle = (size === "lg") ? styles.badgePoslg : styles.badgePosmd;
    const containerStyle = (size === "lg") ? styles.containerlg : styles.containermd;
    return (
        <View style={[styles.container, containerStyle]}>
            <Image
                source={typeof source == "string" ? {uri: source} : source}
                style={[styles.image, sizeStyle]}
            />
            {showBadge && (
                <View 
                    style={[styles.badge, badgeStyle, badgeActive ? styles.babelActive : styles.babelInactive ]}
                />
            )
            }
        </View>
    )
};

Avatar.propTypes = {
    source: PropTypes.any,
    size: PropTypes.string,
    showBadge: PropTypes.bool,
    badgeActive: PropTypes.bool
}

export default Avatar;