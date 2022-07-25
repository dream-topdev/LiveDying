import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import OutlineButton from '../../components/OutlineButton';
import { styles } from './styles';
import Images from '../../utils/Images';
import API from '../../services/API';
import Colors from '../../utils/Colors';
import TestReminderModal from '../../components/TestReminderModal';
import { useQuery } from 'react-query';

const TopWishOutScreen = ({ navigation }) => {

    const { userProfile } = useContext(AuthContext);
    const userId = userProfile.result.id;
    const { data, isLoading, status } = useQuery(["getTopWishById", userId], () => API.getTopWishById(userId));
    const [userName, setUserName] = useState("");
    const [testReminderModal, setTestReminderModal] = useState(false);
    const [topWishList, setTopWishList] = useState([
        // 'Get VP Title',
        // 'Bora Bora',
        // 'Get to 170 lbs',
        // 'Help Poor with electricity',
        // 'Take Grandkids to Disney World'
    ]);

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
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: scale(30)
                    }}>
                    {'Loading...'}
                </Text>
            </View>
        )
        
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <Image
                        source={Images.ic_full_logo}
                        style={styles.logo}
                        resizeMode={'contain'}
                    />
                    <View style={styles.message}>
                        <Text style={styles.notetext}>{"5 Things you still want to do in your life?"}</Text>
                        {topWishList.map((item) => (
                            <Text key={item.id} style={styles.plannote}>{item.content}</Text>
                        ))}
                    </View>
                    <View style={styles.testReminderWrapper}>
                        <OutlineButton
                            title="Text reminders"
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
            </KeyboardAwareScrollView>
            <TestReminderModal
                visible={testReminderModal}
                onClose={() => setTestReminderModal(false)}
            />
        </View>
    )
}
export default TopWishOutScreen;
