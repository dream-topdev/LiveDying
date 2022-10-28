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
import { styles } from './styles';
import Images from '../../utils/Images';


const TopWishOutScreen = ({ navigation }) => {
    const topMessage = 'At the end of your life, how do you want to be remembered?';
    const bottomMessage = 'An excellent way to help you determine how you want to be remembered is to plan your funeral and eulogy.'
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <Image
                        source={Images.ic_full_logo}
                        style={styles.logo}
                        resizeMode={'contain'}
                    />
                    <View style={styles.messageWrapper}>
                        <View style={styles.message}>
                            <Text style={styles.notetext}>{topMessage}</Text>
                            <Text style={styles.plannote}>{bottomMessage}</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default TopWishOutScreen;
