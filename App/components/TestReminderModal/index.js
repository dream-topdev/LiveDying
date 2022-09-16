import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { styles } from './styles';
import IconButton from '../IconButton';
import { scale } from '../../utils/scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../../utils/Images';
import ReminderInput from '../../components/ReminderInput';
import OutlineButton from '../OutlineButton';
import Notifications from '../../Notifications';

const setNotificationSchedule = (repeatType, alarmName) => {
    // Notifications.schduleNotification(date);
    console.log(Platform.OS);
    Platform.OS == 'android'
        ? (
            Notifications.schduleNotification(new Date(Date.now() + 5 * 1000), 'minute', 'alarm.wav')
        ) : (
            Notifications.schduleNotificationIOS(new Date(Date.now() + 5 * 1000), 'day', 'alarm.wav')
        )
};
const cancelNotification = () => {
    // Notifications.deleteNotification(id);
    Notifications.deleteAll();
}
const getIndexEqualTo = (array, value) => {
    const isEqualNumber = (item) => item == value
    const currentIndex = array.findIndex(isEqualNumber)
    return currentIndex
}

const TestReminderModal = ({
    visible,
    onClose,
    notification,
    setNotification,
}) => {
    const AlarmRepeatTypeList = ["Every day", "Every week", "Every month", ' Semiannual', "Annual"];
    const [currentAlarmRepeatIndex, setCurrentAlarmRepeatIndex] = React.useState(2)
    
    const SoundNameList = ['Alarm 1', 'Alarm 2', 'Alarm 3'];
    const [currentSoundNameIndex, setCurrentSoundNameIndex] = React.useState(1);

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
                    <IconButton
                        icon={notification ? Images.ic_alarm : Images.ic_alarm_disable}
                        width={scale(100)}
                        height={scale(40)}
                        overFlow={'visible'}
                        onPress={() => {
                            setNotification();
                            cancelNotification();
                            console.log("Test function. ", new Date(Date.now()))
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{!notification && 'To set reminder, press the bell'}</Text>
                </View>
                <View style={[
                    styles.inputForm,
                    {
                        display: notification ? 'flex' : 'none'
                    }]}>
                    <ReminderInput
                        description={'Reminder'}
                        itemList={AlarmRepeatTypeList}
                        initialIndex={currentAlarmRepeatIndex}
                        setPickerListItem={(flag) => {
                            let currentIndex = getIndexEqualTo(AlarmRepeatTypeList, AlarmRepeatTypeList[currentAlarmRepeatIndex]);
                            console.log('current index', currentIndex);
                            if (flag < 0) {
                                let backIndex = (--currentIndex + AlarmRepeatTypeList.length) % AlarmRepeatTypeList.length;
                                console.log('backindex', backIndex);
                                setCurrentAlarmRepeatIndex(backIndex)
                                console.log("back button press");
                            } else {
                                let nextIndex = (++currentIndex + AlarmRepeatTypeList.length) % AlarmRepeatTypeList.length;
                                console.log('nextIndex', nextIndex);
                                setCurrentAlarmRepeatIndex(nextIndex)
                            }
                        }}
                    />
                    <View style={styles.divider} />
                    <ReminderInput
                        description={'Alarm Type'}
                        itemList={SoundNameList}
                        initialIndex={currentSoundNameIndex}
                        setPickerListItem={(flag) => {
                            let currentIndex = getIndexEqualTo(SoundNameList, SoundNameList[currentSoundNameIndex]);
                            console.log('current index', currentIndex);
                            if (flag < 0) {
                                let backIndex = (--currentIndex + SoundNameList.length) % SoundNameList.length
                                console.log('backindex', backIndex)
                                setCurrentSoundNameIndex(backIndex)
                                console.log("back button press")
                            } else {
                                let nextIndex = (++currentIndex + SoundNameList.length) % SoundNameList.length
                                console.log('nextindex', nextIndex)
                                setCurrentSoundNameIndex(nextIndex)
                                console.log("back button press")
                            }
                        }}
                    />
                    <View style={styles.divider} />
                    <OutlineButton
                        title="Done"
                        loading={false}
                        onPress={() => {
                            onClose();
                            setNotificationSchedule('minute', 'alarm1.wav');
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

TestReminderModal.propTypes = {
    visible: PropTypes.bool,
    notification: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
}

export default TestReminderModal;;