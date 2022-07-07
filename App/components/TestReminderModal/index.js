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

const TestReminderModal = ({ visible, onClose }) => {
    const durations = ["Every 2 hours", "Every day", "Every week", "Every month"];
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
                <View style={styles.alarmWrapper}>
                    <Image
                        source={Images.ic_alarm}
                        style={styles.alarm}
                        resizeMode={'contain'}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{'Set Reminder'}</Text>
                </View>
                <View style={styles.inputForm}>
                    <ReminderInput
                        description={'Reminder'}
                        itemList={['every 2 hours', 'every day', 'every week', 'every month']}
                    />
                    <View style={styles.divider} />
                    <ReminderInput
                        description={'Alarm Type'}
                        itemList={['alarm 1', 'alarm 2', 'alarm 3']}
                    />
                    <View style={styles.divider} />
                    <OutlineButton
                        title="Done"
                        loading={false}
                        onPress={() => { onClose(); }}
                    />
                </View>
            </View>
        </Modal>
    );
};

TestReminderModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
}

export default TestReminderModal;