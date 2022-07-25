import * as React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import TrackPlayer from "react-native-track-player"
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { styles } from './styles';
import Colors from '../../utils/Colors';
import ApplicationStyles from '../../utils/ApplicationStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../../utils/Images';
import ReminderInput from '../../components/ReminderInput';
import OutlineButton from '../OutlineButton';
import IconButton from '../IconButton';

const hostname = 'http://livelikeyouaredying.com/uploads/gallery/';

const MusicPlayerModal = ({ tracks, visible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // useEffect(() => {
  //   if (tracks == undefined || tracks.length == 0)
  //     return;
  //   setUpTrackPlayer();
  //   TrackPlayer.updateOptions({
  //     stopWithApp: true,
  //     capabilities: [
  //       TrackPlayer.CAPABILITY_PLAY,
  //       TrackPlayer.CAPABILITY_PAUSE
  //     ],
  //     compactCapabilities: [
  //       TrackPlayer.CAPABILITY_PLAY,
  //       TrackPlayer.CAPABILITY_PAUSE,
  //     ],
  //   });
  // }, [tracks])

  // useEffect(() => {
  //   return () => TrackPlayer.destroy();
  // }, []);

  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      console.log('Tracks added');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        TrackPlayer.pause();
        onClose();
      }}
      onBackButtonPress={() => {
        TrackPlayer.pause();
        onClose();
      }}
    >
      <View style={styles.container}>
        <View style={styles.closeBtnWrapper}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
          >
            <Icon
              name="close"
              size={25}
              style={styles.playIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.musicContainer}>
          <IconButton
            icon={Images.ic_skip_previous}
            width={35}
            height={35}
            onPress={() => {
              console.log('You clicked the previous button');
              // TrackPlayer.skipToPrevious();
            }}
          />{
            isPlaying
              ?
              <IconButton
                icon={Images.ic_pause}
                width={35}
                height={35}
                onPress={() => {
                  console.log('You clicked the pause button');
                  // TrackPlayer.pause();
                  setIsPlaying(false)
                }}
              />
              :
              <IconButton
                icon={Images.ic_play}
                width={40}
                height={40}
                onPress={() => {
                  console.log('You clicked the play button');
                  // TrackPlayer.play()
                  setIsPlaying(true)
                }}
              />
          }
          <IconButton
            icon={Images.ic_skip_next}
            width={35}
            height={35}
            onPress={() => {
              console.log('You clicked the next button');
              // TrackPlayer.skipToNext();
            }}
          />
        </View>
        <View style={styles.divider} />
      </View>
    </Modal>
  );
};

MusicPlayerModal.propTypes = {
  tracks: PropTypes.array,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default MusicPlayerModal;