import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Switch,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import { useQuery } from "react-query";
import { styles } from './styles';
import { scale } from '../../utils/scale';
import OutlineButton from '../../components/OutlineButton';
import API from '../../services/API';


const LifeSpanScreen = ({ navigation }) => {
    const { loading, userProfile } = useContext(AuthContext);
    const userId = userProfile.result.id;
    console.log('user id', userId)
    const lifeSpan = parseInt(userProfile.result.lifespan).toFixed();
    const topwish = userProfile.topwish;
    console.log('life span is like this', userId, lifeSpan, topwish);
    const [meaning, setMeaning] = useState([]);
    const [eventHint, setEventHint] = useState('');
    const shareMessage = 'Share what you are planning to do over the next 24 years';

    useEffect(() => {
        const temp = userProfile.result.birthday.split('-');
        const birthYear = parseInt(temp[0]);
        const spentLife = new Date().getFullYear() - birthYear;
        const leaveLife = lifeSpan - spentLife;

        let meanList = [
            leaveLife + ' more Birthdays',
            leaveLife + ' more New Year Eves',
            leaveLife + ' more  July 4th Fireworks',
            leaveLife + ' more Super Bowls'
        ];
        setMeaning(meanList);
        setEventHint('To put in perspective ' + leaveLife + ' years ago was ' + (new Date().getFullYear() - leaveLife) + '. What happened in that year ? ')
    }, [])

    if (loading)
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
                                            <Text style={styles.notemean}>{item}</Text>
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
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default LifeSpanScreen;