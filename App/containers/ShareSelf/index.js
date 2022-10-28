import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useQuery, useMutation } from 'react-query';

import IconButton from '../../components/IconButton';
import Loading from '../../components/Loading';
import TextContainer from '../../components/TextContainer';
import SendEmailModal from '../../components/SendEmailModal';

import { scale, scaleVertical } from '../../utils/scale';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';

import { AuthContext } from '../../AuthProvider';
import API from '../../services/API';
import { styles } from './styles';


const ShareSelfScreen = ({ navigation }) => {
    const { userProfile } = useContext(AuthContext);
    const userid = userProfile.result.id;
    console.log('current user id is ', userid);
    const [isVisibleSendEmailModal, setIsVisibleEmailModal] = useState(false);
    const [emailAddress, SetEmailAddress] = useState('')
    const [sharedFromList, setSharedFromList] = useState([]);
    const { data, isLoading: isLoading1, refetch, status } = useQuery(['getSharedFrom', userid], () => API.getShareFromByUserId(userid));
    const { mutate: removeShare, isLoading: isLoading2 } = useMutation(API.removeShareInfo, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: data.message
            })
        },
        onError: (data) => {
            Toast.show({
                type: 'error',
                text1: "Sorry",
                text2: data.message
            })
        }
    })
    const { mutate: requestShareByEmail, isLoading: isLoading3 } = useMutation(API.postRequestShareByUserId, {
        onSuccess: (data) => {
            console.log(' success ========>', data)
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: data.message
            });
            refetch();
        },
        onError: (data) => {
            console.log('data========>', data)
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: data.message
            });
        }
    })
    useEffect(() => {
        if (data != 'undefined' && status == 'success') {
            console.log(data.contents);
            setSharedFromList(data.contents);
        }
    }, [data])

    if (isLoading1 || isLoading2 || isLoading3) {
        return <Loading />
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
                                sharedFromList.map((item) => (
                                    <TextContainer
                                        key={item.id}
                                        text={item.email}
                                        color={Colors.primaryColor}
                                        onPress={() => {
                                            console.log('You clicked the email container ')
                                        }}
                                        onRemove={() => {
                                            Alert.alert(
                                                "Confirm",
                                                'Are you sure want to remove?',
                                                [
                                                    {
                                                        text: 'ok',
                                                        onPress: () => {
                                                            let index = sharedFromList.indexOf(item);
                                                            let temp = [...sharedFromList];
                                                            let params = {
                                                                from: userid,
                                                                to: item.id
                                                            }
                                                            temp.splice(index, 1);
                                                            setSharedFromList(temp);
                                                            removeShare(params);
                                                        }
                                                    },
                                                    {
                                                        text: 'cancel',
                                                        onPress: () => {
                                                            console.log('you clicked the remove button ')
                                                        },
                                                        style: 'cancel'
                                                    }
                                                ]
                                            )

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
                        console.log("you clickekthe succes button", emailAddress);
                        let params = {
                            body: {
                                userId: userid,
                                email: emailAddress
                            }
                        }
                        setIsVisibleEmailModal(false);
                        requestShareByEmail(params)
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
