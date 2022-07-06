import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
    Switch
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import AuthInput from '../../components/AuthInput';
import InlineContainer from '../../components/InlineContainer';
import LinkButton from '../../components/LinkButton';
import OutlineButton from '../../components/OutlineButton';
import IconButton from '../../components/IconButton';
import Images from '../../utils/Images';
import { styles } from './styles';
import { scale } from '../../utils/scale';
import Colors from '../../utils/Colors';

const LifeSpanScreen = ({ navigation }) => {
    const { loading, login } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [smoke, setSmoke] = useState(false);
    const [lifeSpan, setLifeSpan] = useState(81);
    const [meaning, setMeaning] = useState([
        '24 more Birthdays',
        '24 more New Year Eves',
        '24 more  July 4th Fireworks',
        '24 more Super Bowls'
    ]);
    const [eventHint, setEventHint] = useState('To put in perspective 24 years ago was 1998. What appened in that year ? ');
    const [shareMessage, setShareMessage]= useState('Share what you are planning to do over the next 24 years')
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <View style={styles.lifespan}>
                        <Text style={styles.notetext}>{lifeSpan}</Text>
                    </View>
                    <View style={styles.meaning}>
                        <View><Text style={styles.notemeanhead}>That is means:</Text></View>
                        <View><Text style={styles.notemean}>{meaning[0]}</Text></View>
                        <View><Text style={styles.notemean}>{meaning[1]}</Text></View>
                        <View><Text style={styles.notemean}>{meaning[2]}</Text></View>
                        <View><Text style={styles.notemean}>{meaning[3]}</Text></View>
                    </View>
                    <View style={styles.eventhint}>
                        <Text style={styles.noteeventhint}>{eventHint}</Text>
                    </View>
                    <View style={styles.sharemessage}>
                        <Text style={styles.noteeventhint}>{shareMessage}</Text>
                    </View>
                    <View style={styles.loginWrapper}>
                        <OutlineButton
                            title="Next"
                            loading={loading}
                            onPress={() => {
                                login(userName, password);
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default LifeSpanScreen;