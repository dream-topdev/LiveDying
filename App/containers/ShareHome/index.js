import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OutlineButton from '../../components/OutlineButton';
import { styles } from './styles';
import Images from '../../utils/Images';
import { scale } from '../../utils/scale';
import { AuthContext } from '../../AuthProvider';

const ShareHomeScreen = ({ navigation }) => {
    const { userProfile } = useContext(AuthContext);
    console.log(userProfile);
    const isPurchased = new Boolean(userProfile.result.is_purchased);
    console.log("Purchase status ", isPurchased);
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <View style={styles.logoWrapper}>
                        <Image
                            source={Images.ic_full_logo}
                            style={styles.logo}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.notetextWrapper}>
                        <Text style={styles.notetext}                        >
                            {"You can share your infomation to other via email address"}
                        </Text>
                    </View>
                    <View style={styles.shareContainter}>
                        <View style={styles.shareYouWrapper}>
                            <TouchableOpacity
                                style={styles.shareWrapper}
                                onPress={() => {
                                    navigation.navigate('ShareSelf')
                                    console.log('Test')
                                }}
                            >
                                <Image
                                    source={Images.ic_share_active}
                                />
                            </TouchableOpacity>
                            <View style={styles.shareContentWrapper}>
                                <Text style={styles.shareContent}>
                                    {'Send this funeral plan to yourself'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.seeOtherWrapper}>
                            <TouchableOpacity
                                style={styles.seeWrapper}
                                onPress={() => {
                                    navigation.navigate('SeeOther')
                                    console.log('Test')
                                }}
                            >
                                <Image
                                    style={{

                                        width: scale(30),
                                        height: scale(30)
                                    }}
                                    source={Images.ic_eye_active}
                                />
                            </TouchableOpacity>
                            <View style={styles.shareContentWrapper}>
                                <Text style={styles.seeContent}>
                                    {'Send this funeral plan to friends and family'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView >
        </View >
    )
}
export default ShareHomeScreen;
