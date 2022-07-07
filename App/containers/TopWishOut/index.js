import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import OutlineButton from '../../components/OutlineButton';
import AuthInput from '../../components/AuthInput';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';

const TopWishOutScreen = () => {
    const { loading, login } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [topWishList, setTopWishList] = useState([
        'Get VP Title',
        'Bora Bora',
        'Get to 170 lbs',
        'Help Poor with electricity',
        'Take Grandkids to Disney World'
    ]);
    const [shareMessage, setShareMessage] = useState('Share what you are planning to do over the next 24 years')
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
                        {topWishList.map(item => (
                            <Text style={styles.plannote}>{item}</Text>
                        ))}
                    </View>
                    <View style={styles.testReminderWrapper}>
                        <OutlineButton
                            title="Text reminders"
                            loading={loading}
                            backColor={Colors.secondaryColor}
                            onPress={() => {
                                console.log("You lciked ther test reminder button")
                            }}
                        />
                    </View>
                    <View style={styles.loginWrapper}>
                        <OutlineButton
                            title="Next"
                            loading={loading}
                            onPress={() => {
                                navigation.navigate('');
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default TopWishOutScreen;
