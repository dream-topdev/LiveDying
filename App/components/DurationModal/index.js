import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button
  } from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import {styles} from './styles';
import Colors from '../../utils/Colors';
import ApplicationStyles from '../../utils/ApplicationStyles';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleButton from '../ToggleButton';

const DurationModal = ({ visible, onClose}) => {
    const durations = ["Everyday", "Once a week", "Once a month"];
    const [active, setActive]  = React.useState("");
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
            <TouchableOpacity
                style={styles.playCircle}
                onPress={onClose}
            >
                <Icon
                    name="close"
                    size={15}
                    style={styles.playIcon}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.title}>Choose Duration</Text>
                {durations.map(d => (
                    <View style={styles.toggleWrapper}>
                        <ToggleButton
                            title={d}
                            onPress={()=>{setActive(d)}}
                            active={d == active}
                        />
                    </View>
                ))}
            </View>
          </View>
        </Modal>
    );
};

DurationModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
}

export default DurationModal;