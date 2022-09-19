import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import OutlineButton from '../../components/OutlineButton';
import InlineContainer from '../../components/InlineContainer';
import ActionButton from '../../components/ActionButton';
import IconButton from '../../components/IconButton';
import { scale, scaleVertical } from '../../utils/scale';
import AuthInput from '../../components/AuthInput';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import TextContainer from '../../components/TextContainer';
import SendEmailModal from '../../components/SendEmailModal';


const ShareSelfScreen = ({ navigation }) => {
    const { loading, login } = useContext(AuthContext);
    const [testReminderModal, setTestReminderModal] = useState(false);
    const [isVisibleSendEmailModal, setIsVisibleEmailModal] = useState(false);
    const [emailAddress, SetEmailAddress] = useState('')
    const shareList = [
        { id: 0, address: "AntonW@gmail.com" },
        { id: 1, address: "Tyrannosaurus.rex.523@gmail.com" },
        { id: 2, address: "devwithsuccess@gmail.com" },
        { id: 3, address: "nikilayyanposlski@gmail.com" },
        { id: 4, address: "dog.cat.523@gmailc.com" },
    ];
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <View style={styles.header}>
                        <View style={styles.backWrapper}>
                            <IconButton
                                icon={Images.ic_chevron_left}
                                width={25}
                                height={30}
                                marginRight={10}
                                disabled={false}
                                onPress={() => {
                                    navigation.navigate("ShareHome")
                                }}
                            />
                            <Text style={styles.notetext}>{'Sharing yourself'}</Text>
                        </View>
                        <Image
                            source={Images.ic_logo}
                            style={styles.logo}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleContent}>{'Your information is shared with:'}</Text>
                        <IconButton
                            icon={Images.ic_add}
                            width={scale(32)}
                            height={scale(32)}
                            onPress={() => {
                                setIsVisibleEmailModal(true)
                            }}
                        />
                    </View>
                    <View style={styles.messageWrapper}>
                        <ScrollView style={styles.message}>
                            {
                                shareList.map((item) => (
                                    <TextContainer
                                        key={item.id}
                                        text={item.address}
                                        color={Colors.primaryColor}
                                        onPress={() => {
                                            console.log('You clicked the email container ')
                                        }}
                                    />
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
                <SendEmailModal
                    visible={isVisibleSendEmailModal}
                    title={'Enter Email Address'}
                    value={emailAddress}
                    onSuccess={() => {
                        console.log("you clickekthe succes button");
                    }}
                    onChangeText={(v) => {
                        SetEmailAddress(v);
                    }}
                    onClose={() => {
                        setIsVisibleEmailModal(false)
                    }}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}
export default ShareSelfScreen;
