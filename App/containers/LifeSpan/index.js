import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import { styles } from './styles';

import OutlineButton from '../../components/OutlineButton';
import Loading from '../../components/Loading';



const LifeSpanScreen = ({ navigation }) => {
    const { loading, userProfile } = useContext(AuthContext);
    console.log(userProfile)
    const [meaning, setMeaning] = useState([]);
    const [eventHint, setEventHint] = useState('');
    const [lifeSpan, setLifeSpan] = useState(0);
    const [leaveLife, setLeaveLife] = useState(0);
    const [topwish, setTopwish] = useState([]);

    const shareMessage = 'Let’s Plan Your Remaining Years and Live Like You Are Dying';

    useEffect(() => {
        setLifeSpan(parseInt(userProfile.result.lifespan).toFixed());
        setLeaveLife(parseInt(userProfile.result.lifespan).toFixed() - (new Date().getFullYear() - parseInt(userProfile.result.birthyear).toFixed()));
        setTopwish(userProfile.topwish);
        console.log('age ', lifeSpan, leaveLife, new Date().getFullYear(), parseInt(userProfile.result.birthyear).toFixed())
        let meanList = [
            leaveLife + ' more Birthdays',
            leaveLife + ' more New Year Eves',
            leaveLife + ' more July 4th Fireworks',
            leaveLife + ' more Super Bowls'
        ];
        setMeaning(meanList);
        setEventHint('To put in perspective ' + leaveLife + ' years ago was ' + (parseInt(userProfile.result.birthyear).toFixed() - leaveLife) + '.\nWhat happened in that year?')
    }, [userProfile])

    if (loading)
        return <Loading />

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <SafeAreaView style={styles.containerInner}>
                    <View style={styles.lifespan}>
                        <Text style={styles.notetext}>{lifeSpan}</Text>
                    </View>
                    <View style={styles.noteMeanHeadWrapper}>
                        <Text style={styles.notemeanhead}>
                            {'That is means:'}
                        </Text>
                    </View>
                    <View style={styles.bodyContent}>
                        <ScrollView>
                            <View style={styles.meaning}>
                                {
                                    meaning.map((item) => (
                                        <View key={item.toString()}>
                                            {item.indexOf('4th') > -1 ? (
                                                <View style={styles.superStyleWrapper}>
                                                    <Text style={styles.notemean}>{item.split('4th')[0] + '4'}</Text>
                                                    <Text style={[styles.notemean, styles.superStyle]}>{'th'}</Text>
                                                    <Text style={styles.notemean}>{item.split('4th')[1]}</Text>
                                                </View>
                                            ) : (
                                                <Text style={styles.notemean}>{item}</Text>
                                            )}
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={styles.eventhint}>
                                <Text style={styles.noteeventhint}>{eventHint}</Text>
                            </View>
                            <View style={styles.sharemessage}>
                                <Text style={styles.noteeventmessage}>{shareMessage}</Text>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.loginWrapper}>
                        <OutlineButton
                            title="Next"
                            loading={false}
                            onPress={() => {
                                if (topwish.length < 5) {
                                    navigation.navigate('TopWishIn');
                                } else {
                                    navigation.navigate('TopWishOut');
                                }
                            }}
                        />
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default LifeSpanScreen;