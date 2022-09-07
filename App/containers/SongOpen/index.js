import * as React from 'react';
import { useState, useEffect, useContext, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import InlineContainer from '../../components/InlineContainer';
import IconButton from '../../components/IconButton';
import SongItemContainer from '../../components/SongItemContainer';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { scale, scaleVertical } from '../../utils/scale';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import { useMutation, useQuery } from 'react-query';
import API from '../../services/API';
import UploadMethodSelectModal from '../../components/UploadMethodSelectModal';
import DocumentPicker, { types } from 'react-native-document-picker';

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
const SongOpenScreen = ({ navigation }) => {
    const { userProfile } = useContext(AuthContext);
    const userId = userProfile.result.id;
    console.log('user id is got ', userId);
    const [isVisibleYoutubeSelectModal, setisVisibleYoutubeSelectModal] = useState(false);
    const { data, isLoading: isLoading1, status, refetch } = useQuery(['getMediaByUserIdOpen', userId], () => API.getMediaByUserId(userId, 'song', 'open'));
    const [openSongList, setOpenSongList] = useState([]);
    const { mutate: mutate1, isLoading: isLoading2 } = useMutation(API.deleteMediaById, {
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
    const { mutate: uploadFileFromLocal, isLoading: isLoading3 } = useMutation(API.postUploadFileFromLocal, {
        onSuccess: (data) => {
            console.log('onSuccess =========>', data);
            Toast.show({
                type: "success",
                text1: 'Uploaded successfully.',
                text2: data.message
            })
            refetch();
        },
        onError: (data) => {
            console.log('onError =========>', data);
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: data.message
            })
        }
    })

    useEffect(() => {
        if (data != null && status == 'success') {
            let temp = [];
            data.contents.forEach((item) => {
                temp.push(
                    {
                        id: item.id,
                        title: item.title,
                        thumbnail: item.thumbnail,
                        from: item.from,
                        fileUrl: item.file_url,
                        type: item.type,
                        userId: item.user_id
                    }
                )
            })
            console.log('data is following up', temp)
            setOpenSongList(temp)
        }
    }, [data])

    const handleDocumentSelection = useCallback(async (to) => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: types.video
            });
            console.log('F i l e p i c k e r : ', response[0]);
            const selectedVideoFromLocal = response[0];
            const formData = new FormData();
            formData.append('file', {
                name: selectedVideoFromLocal.name,
                type: selectedVideoFromLocal.type,
                uri:
                    Platform.OS === 'android' ? selectedVideoFromLocal.uri : selectedVideoFromLocal.uri.replace('file://', '')
            });
            formData.append('to', 'song');
            formData.append('type', to);
            let parms = {
                userId,
                body: formData
            }
            Alert.alert(
                "Confirm",
                'Are you sure want to upload selected 1 file?',
                [
                    {
                        text: 'ok',
                        onPress: () => {
                            uploadFileFromLocal(parms);
                        }
                    },
                    {
                        text: 'cancel',
                        onPress: () => {
                        },
                        style: 'cancel'
                    }
                ]
            )
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

    if (isLoading1 || isLoading2 || isLoading3) {
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
                    {isLoading3 ? 'Uploading...' : 'Loading...'}
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
                            title="Opening Songs:"
                            backgroundColor={Colors.backgroundColor}
                            fontSize={18}
                            borderRadius={0}
                            paddingRight={10}
                            paddingLeft={0}
                            actionChild={
                                <View style={styles.youtube}>
                                    <Text style={styles.textYoutube}>{'Find On'}</Text>
                                    <IconButton
                                        icon={Images.ic_add}
                                        width={scale(32)}
                                        height={scale(32)}
                                        onPress={() => {
                                            setisVisibleYoutubeSelectModal(true);
                                        }}
                                    />
                                </View>
                            }
                        />
                    </View>
                    <View style={styles.songList}>
                        <ScrollView >
                            {
                                openSongList.map((item) => (
                                    <SongItemContainer
                                        key={item.id}
                                        thumbnail={item.thumbnail}
                                        songTitle={item.title}
                                        songArtist={'Frank Sinatra'}
                                        songTime={'4:54'}
                                        removePress={() => {
                                            Alert.alert(
                                                "Confirm",
                                                'Are you sure want to remove this song?',
                                                [
                                                    {
                                                        text: 'ok',
                                                        onPress: () => {
                                                            let temp = [...openSongList];
                                                            delItemFromJson(temp, 'id', item.id);
                                                            setOpenSongList(temp);
                                                            mutate1(['song', item.id]);
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
                                    navigation.navigate('Funeral')
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
                                    navigation.navigate('SongProcess')
                                    console.log('You clicked the back button')
                                }}
                            />
                        </View>
                    </View>
                </View>
                <UploadMethodSelectModal
                    visible={isVisibleYoutubeSelectModal}
                    title={'Select song you want.'}
                    onClickYoutube={() => {
                        console.log('you clicked the youtube button on modal');
                        navigation.navigate('YoutubeVideoSelect', {
                            to: 'song',
                            type: 'open',
                            goback: 'SongOpen'
                        });
                        setisVisibleYoutubeSelectModal(false);
                    }}
                    onClickLocal={() => {
                        console.log('you clicked the local file');
                        setisVisibleYoutubeSelectModal(false);
                        setTimeout(() => {
                            handleDocumentSelection('open');
                        }, 890);
                    }}
                    onClose={() => setisVisibleYoutubeSelectModal(false)}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SongOpenScreen;
