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
import { useQuery, useMutation } from 'react-query';
import PropTypes from 'prop-types';
import TextContainer from '../../components/TextContainer';
import SendEmailModal from '../../components/SendEmailModal';
import API from '../../services/API';
import { useEffect } from 'react';


const ShareSelfScreen = ({ navigation }) => {
    const { userProfile, fetchFriendProfile, loading } = useContext(AuthContext);
    const userid = userProfile.result.id;
    console.log('current user is ', userid);
    const { data, isLoading, status } = useQuery(['getSharedTo', userid], () => API.getShareToByUserId(userid));

    const [sharedToList, setSharedToList] = useState([]);

    useEffect(() => {
        if (data != undefined && status == 'success') {
            console.log('api call is ', data.contents);
            setSharedToList(data.contents);
        }
    }, [data])

    if (isLoading) {
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
    }

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
                            <Text style={styles.notetext}>{'Watch others'}</Text>
                        </View>
                        <Image
                            source={Images.ic_logo}
                            style={styles.logo}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleContent}>{'You can see others\' info'}</Text>
                    </View>
                    <View style={styles.messageWrapper}>
                        <ScrollView style={styles.message}>
                            {
                                sharedToList.map((item) => (
                                    <TextContainer
                                        key={item.id}
                                        text={item.email}
                                        color={Colors.secondaryColor}
                                        close={false}
                                        onPress={() => {
                                            fetchFriendProfile(item.id);
                                            navigation.navigate('SharedUserHome');
                                            console.log('You clicked the email container ')
                                        }}
                                    />
                                ))
                            }
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default ShareSelfScreen;
