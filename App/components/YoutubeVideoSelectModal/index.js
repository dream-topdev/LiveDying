import * as React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
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
import { scale } from '../../utils/scale';

const YoutubeVideoSelectModal = ({ visible, title, onClose, onClickYoutube }) => {
    const durations = ["Every day", "Every week", "Every month", "Annual"];
    const [active, setActive] = React.useState("");
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
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.bodyWrapper}>
                    <IconButton
                        icon={Images.ic_youtube}
                        width={64}
                        height={44}
                        onPress={() => {
                            onClickYoutube();
                        }}
                    />
                    <IconButton
                        icon={Images.ic_file_open}
                        width={64}
                        height={40}
                        onPress={() => {
                            console.log('You clicked the local device button');
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

YoutubeVideoSelectModal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onClickYoutube: PropTypes.func.isRequired
}

export default YoutubeVideoSelectModal;