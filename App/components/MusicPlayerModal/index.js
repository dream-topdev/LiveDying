import * as React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../../utils/Images';
import IconButton from '../IconButton';
import TrackPlayer, { State } from 'react-native-track-player'

const hostname = 'http://livelikeyouaredying.com/uploads/gallery/';

const MusicPlayerModal = ({ visible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const music = [{
    title: 'death bed',
    artist: 'Powfu',
    artwork: 'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
    url: 'https://sample-music.netlify.app/death%20bed.mp3',
    duration: 2 * 60 + 53,
    id: '1',
  },
  {
    title: 'bad liar',
    artist: 'Imagine Dragons',
    artwork: 'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
    url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
    duration: 2 * 60,
    id: '2',
    track_number: '2'
  }
  ]
  const trackPlayer = async () => {
    console.log('track player is called');
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(music);
  };

  trackPlayer();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        // TrackPlayer.pause();
        onClose();
      }}
      onBackButtonPress={() => {
        // TrackPlayer.pause();
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
                  TrackPlayer.pause();
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
                  TrackPlayer.play()
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
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default MusicPlayerModal;