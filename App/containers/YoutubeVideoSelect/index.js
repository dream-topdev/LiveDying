import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Alert,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import IconButton from '../../components/IconButton';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { scale, scaleVertical } from '../../utils/scale';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import { useMutation, useQuery } from 'react-query';
import API from '../../services/API';
import OutlineButton from '../../components/OutlineButton';
import MasonryList from '@react-native-seoul/masonry-list';
import GalleryItemContainer from '../../components/GalleryItemContainer';
import InlineContainer from '../../components/InlineContainer';


const hostname = 'http://livelikeyouaredying.com/uploads/gallery/';
const YoutubeCard = ({
    item,
    handleDelete,
    currentSelectedIdArray,
    setCurrentSelectedIdArray
}) => {
    const [hideRemoveButton, setHideRemoveButton] = useState(true);
    return (
        <TouchableOpacity
            style={{
                position: 'relative'
            }}
            onPress={() => {
                if (currentSelectedIdArray.indexOf(item.id) > -1) {
                    let delectedIdArray = currentSelectedIdArray.filter((value, index, array) => {
                        return value !== item.id;
                    })
                    setCurrentSelectedIdArray(delectedIdArray);
                    setHideRemoveButton(true);
                    console.log('it is alreadyt exist.', currentSelectedIdArray);
                } else {
                    let tempArray = [...currentSelectedIdArray];
                    tempArray.push(item.id);
                    setCurrentSelectedIdArray(tempArray)
                    setHideRemoveButton(false);
                    console.log('it is new item. ', currentSelectedIdArray)
                }
            }}
        >
            <View
                key={item.id.toString()}
                style={{
                    flex: 1,
                    backgroundColor: Colors.secondaryBackColor,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderColor: Colors.primaryColor,
                    borderWidth: scale(3),
                    borderRadius: scale(8),
                    marginTop: scale(10),
                    marginHorizontal: scale(5),
                    overflow: 'hidden'
                }}
            >
                <GalleryItemContainer
                    url={item.thumbnail}
                    width={'100%'}
                    height={scale(150)}
                    disabled={true}
                    onPress={() => {
                        console.log('You clicked' + item.url)
                    }}
                />
                {
                    !hideRemoveButton &&
                    <View
                        style={{
                            position: 'absolute',
                            right: scale(10),
                            top: scale(10)
                        }}>
                        <IconButton
                            icon={Images.ic_check}
                            width={scale(24)}
                            height={scale(24)}
                            disabled={true}
                            onPress={() => {
                                setHideRemoveButton(true);
                                setCurrentSelectedIdArray(-1);
                                handleDelete(item.id);
                                console.log('adsfasdfasdf', item.id)
                            }}
                        />
                    </View>
                }
                <Text style={styles.imageTitle}>{item.title}</Text>
            </View >
        </TouchableOpacity>
    )
};
const YoutubeVideoSelectScreen = ({ route, navigation }) => {
    const { userProfile } = useContext(AuthContext);
    const userid = userProfile.result.id;
    const { to, type, goback } = route.params;;
    const [photos, setPhotos] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [currentSelectedIdArray, setCurrentSelectedIdArray] = useState([]);
    const [isSearchButtonDisable, setIsSearchButtonDisable] = useState(true);
    const [isOkButtonDisable, setIsOkButtonDisable] = useState(true);
    const [okButtonBackColor, setOkButtonBackColor] = useState(Colors.primaryBackColor)
    const { mutate: mutate2, isLoading: isLoading3 } = useMutation(API.getYoutubeVideoByKey, {
        onSuccess: (data) => {
            let tempArray = [];
            let index = 0;
            console.log('======youtube api call result is=>', data.items);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: data.message
            });
            data.items.forEach((item) => {
                tempArray.push({
                    id: index,
                    videoId: item.id.videoId,
                    thumbnail: item.snippet.thumbnails.default.url,
                    title: item.snippet.title
                })
                index++;
            })
            setPhotos(tempArray);
        },
        onError: (data) => {
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: data.message
            });
        }
    })
    const { mutate: mutate3, isLoading: isLoading4 } = useMutation(API.postYoutubeVideoByUserId, {
        onSuccess: (data) => {
            console.log('======youtube api call result is=>', data);
            Toast.show({
                type: 'success',
                text1: 'Uploaded successfully',
                text2: data.message
            });
            setPhotos([]);
            setKeyword('');
            setCurrentSelectedIdArray([]);
            navigation.replace(goback);
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
        currentSelectedIdArray.length === 0
            ? (
                setIsOkButtonDisable(true),
                setOkButtonBackColor(Colors.primaryBackColor)
            )
            : (
                setIsOkButtonDisable(false),
                setOkButtonBackColor(Colors.primaryColor)
            );
    }, [currentSelectedIdArray])
    const renderItem = ({ item }) => {
        return <YoutubeCard
            item={item}
            handleDelete={handleDelete}
            currentSelectedIdArray={currentSelectedIdArray}
            setCurrentSelectedIdArray={setCurrentSelectedIdArray}
        />
    }
    const handleDelete = (id) => {
        let tempArray = [...photos];
        delItemFromJson(tempArray, 'id', id);
        setPhotos(tempArray);
    }
    if (isLoading4) {
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
                                    navigation.navigate(goback)
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
                    <Text>Details Screen</Text>
                    <Text>{JSON.stringify(to)}</Text>
                    <Text>{JSON.stringify(type)}</Text>
                    <Text>{JSON.stringify(goback)}</Text>
                    <View style={styles.searchboxWrapper}>
                        <InlineContainer
                            title={''}
                            placeholder={'Enter id or keyword'}
                            editable={true}
                            onChangeText={(v) => {
                                setKeyword(v);
                                v === '' ? setIsSearchButtonDisable(true) : setIsSearchButtonDisable(false);
                            }}
                            actionChild={
                                <IconButton
                                    icon={Images.ic_search_disable}
                                    width={scale(18)}
                                    height={scale(18)}
                                    disabled={isSearchButtonDisable}
                                    onPress={() => {
                                        setCurrentSelectedIdArray([]);
                                        const params = {
                                            keyword
                                        }
                                        mutate2(params)
                                    }}
                                />
                            }
                        />
                    </View>
                    <View style={styles.songList}>
                        <SafeAreaView style={styles.tabContent}>
                            {isLoading3
                                ? <View
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
                                : <MasonryList
                                    keyExtractor={(item) => item.id.toString()}
                                    ListHeaderComponent={<View />}
                                    contentContainerStyle={{
                                        alignSelf: 'stretch',
                                    }}
                                    numColumns={2}
                                    data={photos}
                                    renderItem={renderItem}
                                />
                            }
                        </SafeAreaView>
                    </View>
                    <View style={styles.footer}>
                        <OutlineButton
                            title="Done"
                            loading={isOkButtonDisable}
                            loadingContent={<Text style={{ color: Colors.white }}>{'Done'}</Text>}
                            backColor={okButtonBackColor}
                            onPress={() => {
                                let tempArray = [];
                                let currentSelectedCardArray = photos.filter((item) => {
                                    return currentSelectedIdArray.indexOf(item.id) > -1;
                                })
                                console.log('this is test version of filter function ', currentSelectedCardArray);
                                currentSelectedCardArray.forEach((item) => {
                                    tempArray.push({
                                        title: item.title,
                                        url: `https://www.youtube.com/watch?v=${item.videoId}`,
                                        thumbnail: item.thumbnail
                                    })
                                })
                                let params = {
                                    userId: userid,
                                    body: {
                                        to,
                                        type,
                                        contents: tempArray
                                    }
                                }
                                console.log(currentSelectedIdArray);
                                mutate3(params);
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default YoutubeVideoSelectScreen;