import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import OutlineButton from '../../components/OutlineButton';
import AuthInput from '../../components/AuthInput';
import { styles } from './styles';

const TopWishInScreen = ({ navigation }) => {
    const { loading, login } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [eventHint, setEventHint] = useState('To put in perspective 24 years ago was 1998. What appened in that year ? ');
    const [shareMessage, setShareMessage] = useState('Share what you are planning to do over the next 24 years')
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <View style={styles.message}>
                        <Text style={styles.notetext}>{"With just 24 years remaining, what are you going to do with that time?"}</Text>
                        <Text style={styles.plannote}>{"Plan out your time left by focusing on what is most important."}</Text>
                    </View>
                    <View style={styles.topwishlist}>
                        <View>
                            <AuthInput
                                placeholder='Get vp title'
                                value={userName}
                                onChangeText={(v) => setUserName(v)}
                                borderType={"roundTop"}
                            />
                        </View>
                        <View style={styles.divider}/>
                        <View>
                            <AuthInput
                                placeholder='Bora Bora'
                                value={userName}
                                onChangeText={(v) => setUserName(v)}
                                borderType={"roundTop"}
                            />
                        </View>
                        <View style={styles.divider}/>
                        <View>
                            <AuthInput
                                placeholder='Go to 170lbs'
                                value={userName}
                                onChangeText={(v) => setUserName(v)}
                                borderType={"roundTop"}
                            />
                        </View>
                        <View style={styles.divider}/>
                        <View>
                            <AuthInput
                                placeholder='Help poor with electrtcity'
                                value={userName}
                                onChangeText={(v) => setUserName(v)}
                                borderType={"roundTop"}
                            />
                        </View>
                        <View style={styles.divider}/>
                        <View>
                            <AuthInput
                                placeholder='Take Grandkids to Desney world'
                                value={userName}
                                onChangeText={(v) => setUserName(v)}
                                borderType={"roundTop"}
                            />
                        </View>
                    </View>
                    <View style={styles.divider}/>
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
    );
};

export default TopWishInScreen;