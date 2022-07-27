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
import OutlineButton from '../../components/OutlineButton';
import InlineContainer from '../../components/InlineContainer';
import ActionButton from '../../components/ActionButton';
import IconButton from '../../components/IconButton';
import PallbearerContainer from '../../components/PallbearerContainer';
import { scale, scaleVertical } from '../../utils/scale';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, parseMutationArgs } from 'react-query';
import API from '../../services/API';
import AddPeopleModal from '../../components/AddPeopleModal';


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
const PallbearerScreen = ({ navigation }) => {

    const { userProfile } = useContext(AuthContext);
    const userId = userProfile.result.id;
    console.log('Current Use id is ', userId);
    const { data, isLoading: isLoading1, status } = useQuery(['getPallbearerByUserId', userId], () => API.getPallbearerByUserId(userId));
    const [pallbearerList, setPallbearerList] = useState([]);
    const [addPallbearerModal, setAddPallbearerModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const { mutate: mutate1, isLoading: isLoading2 } = useMutation(API.deletePallbearerById, {
        onSuccess: (data) => {
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
    const { mutate: mutate2, isLoading: isLoading3 } = useMutation(API.createPallbearer, {
        onSuccess: (data) => {
            console.log('<----------------------------------------->', data)
            if (data.result == true) {
                let temp = [];
                data.contents.forEach((item) => {
                    temp.push(
                        {
                            id: item.id,
                            firstName: item.first_name,
                            lastName: item.last_name,
                            userId: item.user_id
                        }
                    )
                })
                setPallbearerList(temp)
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
                text2: 'May some issue.'
            });
        }
    });
    const { mutate: mutate3, isLoading: isLoading4 } = useMutation(API.updatePallbearer, {
        onSuccess: (data) => {
            console.log('<----------------------------------------->', data)
            if (data.result == true) {
                let temp = [];
                data.contents.forEach((item) => {
                    temp.push(
                        {
                            id: item.id,
                            firstName: item.first_name,
                            lastName: item.last_name,
                            userId: item.user_id
                        }
                    )
                })
                setPallbearerList(temp)
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
                text2: 'May some issue.'
            });
        }
    });

    useEffect(() => {
        if (data != null && status == 'success') {
            let temp = [];
            data.contents.forEach((item) => {
                temp.push(
                    {
                        id: item.id,
                        firstName: item.first_name,
                        lastName: item.last_name,
                        userId: item.user_id
                    }
                )
            })
            setPallbearerList(temp)
        }
    }, [data])

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
                            title="Pall bearers:"
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
                                            setIsEdit(false);
                                            setFirstName('');
                                            setLastName('');
                                            setAddPallbearerModal(true);
                                            console.log('You clicked the youtube button');
                                        }}
                                    />
                                </View>
                            }
                        />
                    </View>
                    <View style={styles.pallbearerList}>
                        <ScrollView>
                            {
                                pallbearerList.map((item) => (
                                    <PallbearerContainer
                                        key={item.id}
                                        thumbnail={Images.default_avatar}
                                        name={item.firstName + ' ' + item.lastName}
                                        onPress={() => {
                                            setIsEdit(true);
                                            setCurrentId(item.id)
                                            setFirstName(item.firstName)
                                            setLastName(item.lastName)
                                            setAddPallbearerModal(true)
                                            console.log('you clicked the main avatar')
                                        }}
                                        removePress={() => {
                                            Alert.alert(
                                                'Confirm',
                                                'Are you sure want to remove it?',
                                                [
                                                    {
                                                        text: 'OK',
                                                        onPress: () => {
                                                            let temp = [...pallbearerList];
                                                            mutate1(item.id)
                                                            delItemFromJson(temp, 'id', item.id);
                                                            setPallbearerList(temp);
                                                            console.log('you clicked the remove button ', item.id)
                                                        }
                                                    },
                                                    {
                                                        text: 'Cancel',
                                                        onPress: () => {
                                                            console.log('you clocked the cancel button.');
                                                        },
                                                        style: 'cancel'
                                                    },
                                                ]
                                            )
                                        }
                                        }
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
                                    navigation.navigate('SongProcess')
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
                                    navigation.navigate('Speaker')
                                }}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView >
            <AddPeopleModal
                visible={addPallbearerModal}
                textAreaVisible={false}
                firstName={firstName}
                lastName={lastName}
                setFirstName={(v) => {
                    setFirstName(v)
                }}
                setLastName={(v) => {
                    setLastName(v)
                }}
                onClose={() => setAddPallbearerModal(false)}
                onSuccess={() => {
                    if (isEdit) {
                        let params = {
                            userId: userId,
                            body: {
                                contents: [
                                    {
                                        id: currentId,
                                        first_name: firstName,
                                        last_name: lastName,
                                        user_id: userId
                                    }
                                ]
                            }
                        }
                        mutate3(params)
                        console.log('Update api is called successfully. ');
                    } else {
                        let params = {
                            userId: userId,
                            body: {
                                contents: [{
                                    first_name: firstName,
                                    last_name: lastName
                                }]
                            }
                        };
                        mutate2(params);
                    }
                }}
            />
        </View >
    )
}
export default PallbearerScreen;
