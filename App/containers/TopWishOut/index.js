import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useQuery } from 'react-query';

import OutlineButton from '../../components/OutlineButton';
import TestReminderModal from '../../components/TestReminderModal';
import Loading from '../../components/Loading';

import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import { stringToBoolean } from '../../utils/commonUtil';

import { AuthContext } from '../../AuthProvider';
import API from '../../services/API';
import { styles } from './styles';


const TopWishOutScreen = ({ navigation }) => {
    const { userProfile } = useContext(AuthContext);
    const userId = userProfile.result.id;
    // const notification = userProfile.result.is_reminder;
    const { data, isLoading, status } = useQuery(["getTopWishById", userId], () => API.getTopWishById(userId));
    const [testReminderModal, setTestReminderModal] = useState(false);
    const [topWishList, setTopWishList] = useState([]);
    const [notification, setNotification] = useState(stringToBoolean(userProfile.result.is_reminder));

    useEffect(() => {
        if (data != null && status == 'success') {
            let temp = [];
            data.result.forEach((item) => {
                temp.push(
                    {
                        id: item.id,
                        content: item.content
                    }
                )
            })
            setTopWishList(temp);
        }
    }, [data])

    if (isLoading)
        return <Loading />

    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <KeyboardAwareScrollView style={{ flex: 1 }} >
                    <View style={styles.header}>
                        <Text style={styles.headerInner}>{'Top wish'}</Text>
                        <Image
                            source={Images.ic_logo}
                            style={styles.logo}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.message}>
                        <Text style={styles.notetext}>{"5 Things you still want to do in your life?"}</Text>
                        {topWishList.map((item) => (
                            <Text key={item.id} style={styles.plannote}>{item.content}</Text>
                        ))}
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.editTopWish}>
                    <OutlineButton
                        title="Edit"
                        loading={false}
                        onPress={() => {
                            navigation.navigate('TopWishIn')
                        }}
                    />
                </View>
                <View style={styles.testReminderWrapper}>
                    <OutlineButton
                        title="Text reminders"
                        addIcon={true}
                        iconSource={notification ? Images.ic_clock : Images.ic_clock_disable}
                        loading={false}
                        backColor={Colors.secondaryColor}
                        onPress={() => {
                            setTestReminderModal(true);
                        }}
                    />
                </View>
                <View style={styles.loginWrapper}>
                    <OutlineButton
                        title="Next"
                        loading={false}
                        onPress={() => {
                            navigation.navigate('PlanMessage')
                        }}
                    />
                </View>
            </View>
            <TestReminderModal
                visible={testReminderModal}
                notification={notification}
                initRepeatTypeIndex={parseInt(userProfile.result.repeat_type_index)}
                initSoundNameIndex={parseInt(userProfile.result.repeat_sound_index)}
                setNotification={() => {
                    setNotification(!notification)
                }}
                onClose={() => setTestReminderModal(false)}
            />
        </View>
    )
}
export default TopWishOutScreen;
