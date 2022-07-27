import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import SpeakerContainer from '../../components/SpeakerContainer';
import InlineContainer from '../../components/InlineContainer';
import IconButton from '../../components/IconButton';
import { scale, scaleVertical } from '../../utils/scale';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import Toast from 'react-native-toast-message';
import { useQuery, useMutation } from 'react-query';
import API from '../../services/API';
import AddPeopleModal from '../../components/AddPeopleModal';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';

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
    const { data, isLoading: isLoading1, status } = useQuery(['getSpeakerByUserId', userId], () => API.getSpeakerByUserId(userId));
    const [speakerList, setspeakerList] = useState([]);
    const [addSpeakerModal, setAddSpeakerModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [topic, setTopic] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const { mutate: mutate1, isLoading: isLoading2 } = useMutation(API.deleteSpeakerById, {
        onSuccess: data => {
            console.log('<----------------------------------------->', data)
            Toast.show({
                type: 'success',
                text1: 'Welcome',
                text2: data.message
            });
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
        onSuccess: data => {
            console.log('<----------------------------------------->', data)
            if (data.result == true) {
                let temp = [];
                data.contents.forEach((item) => {
                    temp.push(
                        {
                            id: item.id,
                            firstName: item.first_name,
                            lastName: item.last_name,
                            topic: item.topic,
                            userId: item.user_id
                        }
                    )
                })
                setspeakerList(temp)
                Toast.show({
                    type: 'success',
                    text1: 'Welcome',
                    text2: data.message
                });
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Welcome',
                    text2: data.message
                });
            }
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
        onSuccess: data => {
            console.log('<----------------------------------------->', data)
            if (data.result == true) {
                let temp = [];
                data.contents.forEach((item) => {
                    temp.push(
                        {
                            id: item.id,
                            firstName: item.first_name,
                            lastName: item.last_name,
                            topic: item.topic,
                            userId: item.user_id
                        }
                    )
                })
                setspeakerList(temp)
                Toast.show({
                    type: 'success',
                    text1: 'Welcome',
                    text2: data.message
                });
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Welcome',
                    text2: data.message
                });
            }
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

    if (isLoading1 || isLoading2 || isLoading3 || isLoading4) {
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
                        <Text style={styles.notetext}>{'Agenda'}</Text>
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
                                        thumbnail={Images.default_avatar}
                                        speakerName={`${item.firstName} ${item.lastName}`}
                                        speakerTopic={item.topic}
                                        onPress={() => {
                                            setIsEdit(true);
                                            setCurrentId(item.id)
                                            setFirstName(item.firstName)
                                            setLastName(item.lastName)
                                            setTopic(item.topic)
                                            setAddSpeakerModal(true);
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
                            <IconButton
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
                            />
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
            </KeyboardAwareScrollView>
            <AddPeopleModal
                visible={addSpeakerModal}
                firstName={firstName}
                lastName={lastName}
                topic={topic}
                setFirstName={(v) => {
                    setFirstName(v)
                }}
                setLastName={(v) => {
                    setLastName(v)
                }}
                setTopic={(v) => {
                    setTopic(v)
                }}
                onSuccess={() => {
                    if (isEdit) {
                        let params = {
                            userId,
                            body: {
                                contents: [{
                                    id: currentId,
                                    user_id: userId,
                                    first_name: firstName,
                                    last_name: lastName,
                                    topic: topic
                                }]
                            }
                        }
                        mutate3(params);
                        console.log('update speaker is updateed successfully. ');
                    } else {

                        let params = {
                            userId,
                            body: {
                                contents: [{
                                    first_name: firstName,
                                    last_name: lastName,
                                    topic: topic
                                }]
                            }
                        }
                        mutate2(params)
                        console.log('you clicked the success button .');
                    }
                }}
                onClose={() => {
                    setAddSpeakerModal(false);
                }}
            />
        </View>
    )
}
export default SpeakerScreen;
