import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import VideoPlayer from 'react-native-video-controls';
import IconButton from '../IconButton';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import { styles } from './styles';


const VideoPlayerModal = ({ url, title, visible, onClose }) => {
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
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon={Images.ic_back}
            width={52}
            height={52}
            backColor={Colors.white}
            onPress={() => onClose()}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
        <VideoPlayer
          style={styles.videoPlayer}
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
      </View >
    </Modal>
  );
};

VideoPlayerModal.propTypes = {
  visible: PropTypes.bool,
  url: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

export default VideoPlayerModal;