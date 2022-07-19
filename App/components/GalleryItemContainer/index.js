import * as React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { scale } from '../../utils/scale';

const GalleryItemContainer = ({ url, width = 150, height = 150, disabled, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}
    >
      <Image
        source={{ uri: url }}
        style={[
          styles.image,
          {
            width: scale(width),
            height: scale(height)
          }
        ]}
      />
    </TouchableOpacity>
  );
};

GalleryItemContainer.propTypes = {
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
}

export default GalleryItemContainer;