import * as React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import VideoPlayer from 'react-native-video-controls';
import { styles } from './styles';
import Colors from '../../utils/Colors';
import ApplicationStyles from '../../utils/ApplicationStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../../utils/Images';
import ReminderInput from '../../components/ReminderInput';
import OutlineButton from '../OutlineButton';

const VideoPlayerModal = ({ url, visible, onClose }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        onClose();
      }}
      onBackButtonPress={() => {
        onClose();
      }}
    >
      <VideoPlayer
        source={{ uri: url }}
        thumbnail={url}
        tapAnywhereToPause={true}
        toggleResizeModeOnFullscreen={false}
        isFullScreen={true}
        disableBack={true}
        disableVolume={false}
        controlTimeout={5000}
        paused={false}
        seekColor={Colors.secondaryColor}
      />
    </Modal>
  );
};

VideoPlayerModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string
}

export default VideoPlayerModal;