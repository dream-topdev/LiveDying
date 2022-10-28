import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMutation } from 'react-query';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';

import IconButton from '../IconButton';
import ReminderInput from '../ReminderInput';
import OutlineButton from '../OutlineButton';
import Loading from '../Loading';

import Notifications from '../../Notifications';

import Images from '../../utils/Images';
import { scale } from '../../utils/scale';

import { AuthContext } from '../../AuthProvider';
import API from '../../services/API';
import { styles } from './styles';

const repeatTypeList = Platform.OS == 'android'
    ? ['minute', 'hour', 'day', 'week']
    : ['day', 'week', 'month', 'year'];

const soundFileNameList = ['alarm1.wav', 'alarm2.wav', 'alarm3.wav'];

const TestReminderModal = ({
    visible,
    onClose,
    notification,
    setNotification,
    initRepeatTypeIndex = 0,
    initSoundNameIndex = 0
}) => {
    const { userProfile, fetchProfile, loading } = useContext(AuthContext)

    // const AlarmRepeatTypeList = ["Every day", "Every week", "Every month", ' Semiannual', "Annual"];
    const userid = userProfile.result.id;
    const AlarmRepeatTypeList = Platform.OS == 'android'
        ? ['Every minute', "Every hour", "Every day", "Every week"]
        : ["Every day", "Every week", "Every month", "Annual"];
    const [currentAlarmRepeatIndex, setCurrentAlarmRepeatIndex] = useState(initRepeatTypeIndex)
    const SoundNameList = ['Alarm 1', 'Alarm 2', 'Alarm 3'];

    const [currentSoundNameIndex, setCurrentSoundNameIndex] = useState(initSoundNameIndex);
    const { mutate: setReminder, isLoading } = useMutation(API.setReminder, {
        onSuccess: (data) => {
            console.log('setreminder call is succes ', data.content)
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: data.message
            })
            data.content.is_reminder
                ? setNotificationSchedule(currentAlarmRepeatIndex, currentSoundNameIndex)
                : cancelNotification();
            // fetchProfile(userid);
            onClose();
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: err.message
            })
            onClose();
        }
    })

    const setNotificationSchedule = (currentAlarmRepeatIndex, currentSoundNameIndex) => {
        //android repeate type : minute, hour , day , week and time 
        //ios repeat type  : year, month, week, day, hour,  minute, second  
        console.log('Selected items : ', currentAlarmRepeatIndex, currentSoundNameIndex)
        Platform.OS == 'android'
            ? (
                Notifications.schduleNotification(new Date(Date.now() + 5 * 1000), repeatTypeList[currentAlarmRepeatIndex], soundFileNameList[currentSoundNameIndex])
            ) : (
                Notifications.schduleNotificationIOS(new Date(Date.now() + 5 * 1000), repeatTypeList[currentAlarmRepeatIndex], soundFileNameList[currentSoundNameIndex])
            )
    };
    const cancelNotification = () => {
        Notifications.deleteAll();
    }

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
            {
                isLoading ? (
                    visible && <Loading />
                ) : (
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
                                width={scale(130)}
                                height={scale(80)}
                                overFlow={'visible'}
                                onPress={() => {
                                    setNotification();
                                    if (notification && userProfile.result.is_reminder) {
                                        Alert.alert(
                                            "Confirm",
                                            'Are you sure want to remove reminder?',
                                            [
                                                {
                                                    text: 'ok',
                                                    onPress: () => {
                                                        let params = {
                                                            userid,
                                                            body: {
                                                                isReminder: false,
                                                                repeatTypeIndex: 0,
                                                                repeatSoundIndex: 0
                                                            }
                                                        }
                                                        setReminder(params);
                                                        console.log('test icons but on f');
                                                    }
                                                },
                                                {
                                                    text: 'cancel',
                                                    onPress: () => {
                                                    },
                                                    style: 'cancel'
                                                }
                                            ]
                                        )
                                    }
                                }
                                }
                            />
                        </View>
                        <View>
                            <Text style={[
                                styles.title,
                                {
                                    display: notification ? 'none' : "flex"
                                }
                            ]}>
                                {'To set reminder, press the bell'}
                            </Text>
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
                                    let currentIndex = AlarmRepeatTypeList.indexOf(AlarmRepeatTypeList[currentAlarmRepeatIndex]);
                                    if (flag < 0) {
                                        let backIndex = (--currentIndex + AlarmRepeatTypeList.length) % AlarmRepeatTypeList.length;
                                        setCurrentAlarmRepeatIndex(backIndex)
                                    } else {
                                        let nextIndex = (++currentIndex + AlarmRepeatTypeList.length) % AlarmRepeatTypeList.length;
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
                                    let currentIndex = SoundNameList.indexOf(SoundNameList[currentSoundNameIndex]);
                                    if (flag < 0) {
                                        let backIndex = (--currentIndex + SoundNameList.length) % SoundNameList.length
                                        setCurrentSoundNameIndex(backIndex)
                                    } else {
                                        let nextIndex = (++currentIndex + SoundNameList.length) % SoundNameList.length
                                        setCurrentSoundNameIndex(nextIndex)
                                    }
                                }}
                            />
                            <View style={styles.divider} />
                            <OutlineButton
                                title="Done"
                                loading={false}
                                onPress={() => {
                                    Alert.alert(
                                        "Confirm",
                                        'Are you sure want to set reminder?',
                                        [
                                            {
                                                text: 'ok',
                                                onPress: () => {
                                                    let params = {
                                                        userid,
                                                        body: {
                                                            isReminder: true,
                                                            repeatTypeIndex: currentAlarmRepeatIndex,
                                                            repeatSoundIndex: currentSoundNameIndex
                                                        }
                                                    }
                                                    setReminder(params);
                                                }
                                            },
                                            {
                                                text: 'cancel',
                                                onPress: () => {
                                                },
                                                style: 'cancel'
                                            }
                                        ]
                                    )
                                }}
                            />
                        </View>
                    </View>
                )
            }
        </Modal>
    );
};

TestReminderModal.propTypes = {
    visible: PropTypes.bool,
    notification: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    initRepeatTypeIndex: PropTypes.number,
    initSoundNameIndex: PropTypes.number
}

export default TestReminderModal;;