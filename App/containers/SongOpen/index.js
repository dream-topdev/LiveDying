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
import YoutubeVideoSelectModal from '../../components/YoutubeVideoSelectModal';

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
    const [isVisiblYoutubeSelectModal, setIsVisiblYoutubeSelectModal] = useState(false);
    const { data, isLoading: isLoading1, status } = useQuery(['getMediaByUserIdOpen', userId], () => API.getMediaByUserId(userId, 'song', 'open'));
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

    useEffect(() => {
        if (data != null && status == 'success') {
            let temp = [];
            data.contents.forEach((item) => {
                temp.push(
                    {
                        id: item.id,
                        title: item.title,
                        thumbnail: item.thumbnail,
                        youtubeUrl: item.youtoube_url,
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

    if (isLoading1 || isLoading2) {
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
                                            setIsVisiblYoutubeSelectModal(true);
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
                <YoutubeVideoSelectModal
                    visible={isVisiblYoutubeSelectModal}
                    title={'Select song you want.'}
                    onClickYoutube={() => {
                        console.log('you clicked the youtube button on modal');
                        navigation.navigate('YoutubeVideoSelect', {
                            to: 'song',
                            type: 'open',
                            goback: 'SongOpen'
                        });
                    }}
                    onClose={() => setIsVisiblYoutubeSelectModal(false)}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SongOpenScreen;
