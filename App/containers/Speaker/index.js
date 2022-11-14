import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker, { types } from 'react-native-document-picker'
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueries } from 'react-query';

import SpeakerContainer from '../../components/SpeakerContainer';
import InlineContainer from '../../components/InlineContainer';
import AddPeopleModal from '../../components/AddPeopleModal';
import IconButton from '../../components/IconButton';
import Loading from '../../components/Loading';

import Images from '../../utils/Images';
import Colors from '../../utils/Colors';

import { AuthContext } from '../../AuthProvider';
import API from '../../services/API';
import { styles } from './styles';


const defaultAvatarUrl = 'http://livelikeyouaredying.com/assets/images/default/default_avatar.png';

const delItemFromJson = (jsonArray, key, value) => {
    var BreakException = {};
    var index = 0;
    try {
        jsonArray.forEach((item) => {
            if (item[key] === value) throw BreakException;
            index++;
        });
    } catch (e) {
        if (e !== BreakException) throw e;
        jsonArray.splice(index, 1)
        console.log('you deleted whose item \' index is ', index);
    }
}

const SpeakerScreen = ({ navigation }) => {
    const { userProfile } = useContext(AuthContext);
    const userId = userProfile.result.id;
    console.log('Current Use id is ', userId);
    const { data, isLoading: isLoading1, status, refetch } = useQuery(['getSpeakerByUserId', userId], () => API.getSpeakerByUserId(userId));
    const [speakerList, setspeakerList] = useState([]);
    const [addSpeakerModal, setAddSpeakerModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [topic, setTopic] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [avatarInfo, setAvatarInfo] = useState({});
    const [isOkButtonDisable, setIsOkButtonDisable] = useState(true)
    const { mutate: mutate1, isLoading: isLoading2 } = useMutation(API.deleteSpeakerById, {
        onSuccess: data => {
            console.log('<----------------------------------------->', data)
            Toast.show({
                type: 'success',
                text1: 'Welcome',
                text2: data.message
            });
            refetch();
        },
        onError: (data) => {
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: data.message
            });
        }
    });
    const { mutate: mutate2, isLoading: isLoading3 } = useMutation(API.postSpeaker, {
        onSuccess: (data) => {
            console.log('<----------------------------------------->', data)
            Toast.show({
                type: 'success',
                text1: 'Welcome',
                text2: data.message
            });
            refetch();
        },
        onError: (data) => {
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: data.message
            });
        }
    })
    const { mutate: mutate3, isLoading: isLoading4 } = useMutation(API.updateSpeaker, {
        onSuccess: (data) => {
            console.log('<----------------------------------------->', data)
            Toast.show({
                type: 'success',
                text1: 'Welcome',
                text2: data.message
            });
            refetch();
        },
        onError: (data) => {
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: data.message
            });
        }
    })

    useEffect(() => {
        if (data != null && status == 'success') {
            let temp = [];
            console.log('I am expert =========<================>====>', data)
            data.contents.forEach((item) => {
                temp.push(
                    {
                        id: item.id,
                        avatar: item.avatar,
                        firstName: item.first_name,
                        lastName: item.last_name,
                        topic: item.topic,
                        userId: item.user_id
                    }
                )
            })
            setspeakerList(temp)
        }
    }, [data]);

    useEffect(() => {
        console.log('current stat is ', firstName, lastName, topic);
        setIsOkButtonDisable(!isValidOkButton())
    }, [firstName, lastName, topic]);

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: types.images
            });
            const selectedAvatar = response[0];
            console.log('selected avatar information', selectedAvatar);
            setAvatarInfo({ ...selectedAvatar, 'avatarCreated': true });
            console.log('F i l e p i c k e r ', selectedAvatar.uri);
        } catch (err) {
            Alert.alert(
                "Warning",
                err.toString(),
                [
                    {
                        text: 'ok',
                        onPress: () => {
                        }
                    }
                ]
            )
        }
    }, []);

    const isValidOkButton = () => {
        if (firstName != null && firstName != '' &&
            lastName != null && lastName != '' &&
            topic != null && topic != '') {
            return true;
        }
        return false
    }
    if (isLoading1 || isLoading2 || isLoading3 || isLoading4) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{flex:1}}>
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
                                    navigation.goBack()
                                }}
                            />
                            <Text style={styles.notetext}>{'Agenda'}</Text>
                        </View>
                        <Image
                            source={Images.ic_logo}
                            style={styles.logo}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.message}>
                        <InlineContainer
                            title="Speakers:"
                            backgroundColor={Colors.backgroundColor}
                            fontSize={18}
                            borderRadius={0}
                            paddingRight={5}
                            paddingLeft={0}
                            actionChild={
                                <View style={styles.youtube}>
                                    <IconButton
                                        icon={Images.ic_add}
                                        width={35}
                                        height={35}
                                        onPress={() => {
                                            setIsEdit(false)
                                            setFirstName('')
                                            setLastName('')
                                            setTopic('')
                                            setAddSpeakerModal(true);
                                            console.log('You clicked the youtube button');
                                        }}
                                    />
                                </View>
                            }
                        />
                    </View>
                    <View style={styles.songList}>
                        <ScrollView >
                            {
                                speakerList.map((item) => (
                                    <SpeakerContainer
                                        key={item.id}
                                        thumbnail={item.avatar}
                                        speakerName={`${item.firstName} ${item.lastName}`}
                                        speakerTopic={item.topic}
                                        onPress={() => {
                                            setIsEdit(true);
                                            setAvatarInfo({ 'uri': item.avatar, 'avatarCreated': false });
                                            setCurrentId(item.id);
                                            setFirstName(item.firstName);
                                            setLastName(item.lastName);
                                            setTopic(item.topic);
                                            setAddSpeakerModal(true);
                                            setIsOkButtonDisable(true);
                                            console.log('you clicked the main avatar');
                                        }}
                                        removePress={() => {
                                            Alert.alert(
                                                "Confirm",
                                                'Are you sure want to remove?',
                                                [
                                                    {
                                                        text: 'ok',
                                                        onPress: () => {
                                                            let temp = [...speakerList];
                                                            delItemFromJson(temp, 'id', item.id);
                                                            setspeakerList(temp);
                                                            mutate1(item.id);
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
                    <View style={styles.footer}>
                        <View style={styles.footerInner}>
                            {/* <IconButton
                                icon={Images.ic_back}
                                width={52}
                                height={52}
                                onPress={() => {
                                    console.log('You clicked the back button')
                                    navigation.navigate('Pallbearer')
                                }}
                            />
                            <IconButton
                                icon={Images.ic_home}
                                width={52}
                                height={52}
                                onPress={() => {
                                    console.log('You clicked the back button')
                                    navigation.navigate('Profile')
                                }}
                            /> */}
                            <IconButton
                                icon={Images.ic_next}
                                width={52}
                                height={52}
                                onPress={() => {
                                    console.log('You clicked the back button')
                                    navigation.navigate('Gallery')
                                }}
                            />
                        </View>
                    </View>
                </View>
                <AddPeopleModal
                    title={isEdit ? "Edit Speaker" : 'Add New Speaker'}
                    visible={addSpeakerModal}
                    avatarUrl={(avatarInfo.uri == undefined || avatarInfo.uri == null) ? defaultAvatarUrl : avatarInfo.uri}
                    firstName={firstName}
                    lastName={lastName}
                    topic={topic}
                    isOkButtonDisable={isOkButtonDisable}
                    setFirstName={(v) => { setFirstName(v) }}
                    setLastName={(v) => { setLastName(v) }}
                    setTopic={(v) => { setTopic(v) }}
                    onClickEditButton={() => {
                        console.log('you clicked the edit button.');
                        handleDocumentSelection('video');
                    }}
                    onSuccess={() => {
                        const formData = new FormData();
                        if (avatarInfo.avatarCreated) {
                            formData.append('avatar', {
                                name: avatarInfo.name,
                                type: avatarInfo.type,
                                uri:
                                    Platform.OS === 'android' ? avatarInfo.uri : avatarInfo.uri.replace('file://', '')
                            });
                        } else if (Object.keys(avatarInfo).length > 0) {
                            formData.append('avatar', avatarInfo.uri);
                        }
                        formData.append('id', currentId)
                        formData.append('first_name', firstName);
                        formData.append('last_name', lastName);
                        formData.append('topic', topic);
                        let params = {
                            userId,
                            body: formData
                        }
                        isEdit ? mutate3(params) : mutate2(params)
                        console.log('you clicked the success button .');
                    }}
                    onClose={() => {
                        setAddSpeakerModal(false);
                        setAvatarInfo({});
                    }}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SpeakerScreen;
