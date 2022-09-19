import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OutlineButton from '../../components/OutlineButton';
import { styles } from './styles';
import Images from '../../utils/Images';

const SettingScreen = ({ navigation }) => {
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
                            <Text style={styles.notetext}>{"At the end of your life, what will be about your life?"}</Text>
                            <Text style={styles.plannote}>{"A great way to Figure that out isto plan your funeral and eulogy."}</Text>
                        </View>
                    </View>
                    <View style={styles.loginWrapper}>
                        <OutlineButton
                            title="Next"
                            loading={false}
                            onPress={() => {
                                navigation.navigate('Funeral');
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SettingScreen;
