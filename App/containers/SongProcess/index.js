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

const SongProcessScreen = ({ navigation }) => {
    const { userProfile } = useContext(AuthContext);
    const userId = userProfile.result.id;
    console.log('user id is got ', userId);
    const { data, isLoading: isLoading1, status } = useQuery(['getMediaByUserIdProcess', userId], () => API.getMediaByUserId(userId, 'song', 'process'));
    const [processSongList, setProcessSongList] = useState([]);
    const { mutate: mutate1, isLoading: isLoading2 } = useMutation(API.deleteMediaById, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Welcome',
                text2: data.message
            })
        },
        onError: (data) => {
            Toast.show({
                type: 'error',
                text1: 'Welcome',
                text2: data.message
            })
        }
    })
    useEffect(() => {
        if (data != null && status == 'success') {
            let temp = [];
            data.contents.forEach((item) => {
                console.log('============>>>>>>>', item)
                temp.push(
                    {
                        id: item.id,
                        title: item.title,
                        youtubeUrl: item.youtoube_url,
                        fileUrl: item.file_url,
                        type: item.type,
                        userId: item.user_id
                    }
                )
            })
            setProcessSongList(temp)
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
                            title="Processing Songs:"
                            backgroundColor={Colors.backgroundColor}
                            fontSize={18}
                            borderRadius={0}
                            paddingRight={10}
                            paddingLeft={0}
                            actionChild={
                                <View style={styles.youtube}>
                                    <Text style={styles.textYoutube}>{'Find On'}</Text>
                                    <IconButton
                                        icon={Images.ic_youtube}
                                        width={scale(32)}
                                        height={scale(22)}
                                        onPress={() => {
                                            console.log('You clicked the  youtube button');
                                        }}
                                    />
                                </View>
                            }
                        />
                    </View>
                    <View style={styles.songList}>
                        <ScrollView >
                            <ScrollView >
                                {
                                    processSongList.map((item) => (
                                        <SongItemContainer
                                            key={item.id}
                                            thumbnail={''}
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
                                                                let tempArray = [...processSongList];
                                                                delItemFromJson(tempArray, 'id', item.id)
                                                                setProcessSongList(tempArray);
                                                                mutate1(['song', item.id]);
                                                                console.log("You clicked item whose id is ", item.id)
                                                            }
                                                        },
                                                        {
                                                            text: 'cancel',
                                                            onPress: () => {
                                                                console.log('you clicked the cancel button.');
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
                                    navigation.navigate('SongOpen')
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
                                    navigation.navigate('Pallbearer')
                                }}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SongProcessScreen;
