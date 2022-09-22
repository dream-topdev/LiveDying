import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../../AuthProvider';
import IconButton from '../../components/IconButton';
import { scale, scaleVertical } from '../../utils/scale';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MasonryList from '@react-native-seoul/masonry-list';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import TextContainer from '../../components/TextContainer';
import SpeakerContainer from '../../components/SpeakerContainer';
import SongItemContainer from '../../components/SongItemContainer';
import GalleryItemContainer from '../../components/GalleryItemContainer';
import MusicPlayerModal from '../../components/MusicPlayerModal';
import VideoPlayerModal from '../../components/VideoPlayerModal';
import API from '../../services/API';
import { useQuery, useMutation } from 'react-query';

const hostname = 'http://livelikeyouaredying.com/uploads/gallery/';
const icMusic = 'http://livelikeyouaredying.com/assets/images/ic_music_symbol_v2.png';
const icVideo = 'http://livelikeyouaredying.com/assets/images/videoplay_v1.png';

const MusicCard = ({ item }) => {
    const [muisicPlayerModal, setMusicPlayerModal] = useState(false);
    const [hideRemoveButton, setHideRemoveButton] = useState(true);
    console.log('refresh function is called.')
    return (
        <>
            <TouchableOpacity
                style={{
                    position: 'relative'
                }}
                onPress={() => {
                    setMusicPlayerModal(true)
                }}
            >
                <View
                    key={item.id.toString()}
                    style={styles.cardStyle}
                >
                    <GalleryItemContainer
                        url={icMusic}
                        width={scale(50)}
                        height={scale(50)}
                        disabled={false}
                        onPress={() => {
                            setMusicPlayerModal(true)
                            console.log(item.file_url)
                        }}
                    />
                    <Text style={styles.musicTitle}>{item.title}</Text>
                </View>
            </TouchableOpacity>
            <MusicPlayerModal
                // tracks={musics}
                visible={muisicPlayerModal}
                onClose={() => setMusicPlayerModal(false)}
            />
        </>
    );
};
const MusicRoute = ({ text }) => {
    const { friendProfile } = useContext(AuthContext);
    const friendid = friendProfile.result.id;
    const { data, isLoading, status } = useQuery(['getMusciGalleryByFriendId', friendid], () => API.getMediaByUserId(friendid, 'gallery', 'music'));

    const [music, setMusic] = useState([]);
    useEffect(() => {
        console.log('Get music api is called ', data);
        if (data != null && status == 'success') {
            let temp = [];
            data.contents.forEach((item) => {
                temp.push({
                    id: item.id,
                    url: hostname + item.file_url,
                    title: item.title
                })
            })
            setMusic(temp)
        }
    }, [data])

    const renderItem = ({ item }) => {
        return (
            <MusicCard item={item} />
        );
    }
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
        <SafeAreaView style={styles.tabContent}>
            <MasonryList
                style={{
                }}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={<View />}
                contentContainerStyle={{
                    alignSelf: 'stretch',
                }}
                numColumns={2}
                data={music}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}
const VideoCard = ({ item }) => {
    const [videoPlayerModal, setVideoPlayerModal] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    return (
        <>
            <TouchableOpacity
                style={{
                    position: 'relative'
                }}
            >
                <View
                    key={item.id.toString()}
                    style={styles.cardStyle}
                >
                    <GalleryItemContainer
                        url={icVideo}
                        width={scale(50)}
                        height={scale(50)}
                        disabled={false}
                        onPress={() => {
                            setCurrentUrl(item.file_url);
                            setVideoPlayerModal(true);
                            console.log(item.file_url);
                        }}
                    />
                    <Text style={styles.musicTitle}>{item.title}</Text>
                </View>
                <VideoPlayerModal
                    url={currentUrl}
                    visible={videoPlayerModal}
                    onClose={() => setVideoPlayerModal(false)}
                />
            </TouchableOpacity>
        </>
    );
}
const VideoRoute = ({ text }) => {
    const { friendProfile } = useContext(AuthContext);
    const friendid = friendProfile.result.id;
    const { data, isLoading, status } = useQuery(['getVideoGalleryByFriendId', friendid], () => API.getMediaByUserId(friendid, 'gallery', 'video'));

    const [video, setVideo] = useState([]);
    useEffect(() => {
        console.log('Get music api is called ', data);
        if (data != null && status == 'success') {
            let temp = [];
            data.contents.forEach((item) => {
                temp.push({
                    id: item.id,
                    url: hostname + item.file_url,
                    title: item.title
                })
            })
            setVideo(temp)
        }
    }, [data])

    const renderItem = ({ item }) => {
        return (
            <VideoCard item={item} />
        );
    }
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
        <SafeAreaView style={styles.tabContent}>
            <MasonryList
                style={{
                }}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={<View />}
                contentContainerStyle={{
                    alignSelf: 'stretch',
                }}
                numColumns={2}
                data={video}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}
const PhotoCard = ({ item }) => {
    return (
        <TouchableOpacity
            style={{
                position: 'relative'
            }}
        >
            <View
                key={item.id.toString()}
                style={{
                    backgroundColor: Colors.secondaryBackColor,
                    flex: 1,
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
                    url={item.file_url}
                    width={'100%'}
                    height={scale(150)}
                    disabled={false}
                    onPress={() => {
                        console.log('You clicked' + item.file_url)
                    }}
                />
                <Text style={styles.imageTitle}>{item.title}</Text>
            </View >
        </TouchableOpacity>
    )
};
const PhotoRoute = () => {
    const { friendProfile } = useContext(AuthContext);
    const friendid = friendProfile.result.id;
    const { data, isLoading, status } = useQuery(['getPhotoGalleryByFriendId', friendid], () => API.getMediaByUserId(friendid, 'gallery', 'photo'));

    const [photo, setPhoto] = useState(
        [
            {
                created_at: "2022-07-01T21:55:35.000000Z",
                file_url: "http://livelikeyouaredying.com/uploads/gallery/gallery_photo_userid_5_1656712535.jpg",
                from: "local",
                id: 23,
                is_deleted: "0",
                thumbnail: null,
                title: "1.happy.jpg",
                type: "photo",
                updated_at: "2022-07-01T21:55:35.000000Z",
                user_id: "5"
            }, {
                created_at: "2022-07-01T21:55:45.000000Z",
                file_url: "http://livelikeyouaredying.com/uploads/gallery/gallery_photo_userid_5_1656712545.jpg",
                from: "local",
                id: 24,
                is_deleted: "0",
                thumbnail: null,
                title: "2.birthday.jpg",
                type: "photo",
                updated_at: "2022-07-01T21:55:45.000000Z",
                user_id: "5"
            }, {
                created_at: "2022-07-01T21:56:03.000000Z",
                file_url: "http://livelikeyouaredying.com/uploads/gallery/gallery_photo_userid_5_1656712563.jpg",
                from: "local",
                id: 26,
                is_deleted: "0",
                thumbnail: null,
                title: "colored-pencils-colour-pencils-mirroring-color-37539-680x350.jpg",
                type: "photo",
                updated_at: "2022-07-01T21:56:03.000000Z",
                user_id: "5"
            }, {
                created_at: "2022-09-05T01:23:10.000000Z",
                file_url: "http://livelikeyouaredying.com/uploads/gallery/gallery_photo_userid_5_1662340990.jpg",
                from: "local",
                id: 59,
                is_deleted: "0",
                thumbnail: null,
                title: "rn_image_picker_lib_temp_4e5c7906-7bdf-4ed7-ab64-6fedcde6dbba.jpg",
                type: "photo",
                updated_at: "2022-09-05T01:23:10.000000Z",
                user_id: "5"
            }, {
                created_at: "2022-09-05T09:51:38.000000Z",
                file_url: "http://livelikeyouaredying.com/uploads/gallery/gallery_photo_userid_5_1662371498.jpg",
                from: "local",
                id: 65,
                is_deleted: "0",
                thumbnail: null,
                title: "IMG_20220904_071618.jpg",
                type: "photo",
                updated_at: "2022-09-05T09:51:38.000000Z",
                user_id: "5"
            }, {
                created_at: "2022-09-05T09:59:16.000000Z",
                file_url: "http://livelikeyouaredying.com/uploads/gallery/gallery_photo_userid_5_1662371956.jpg",
                from: "local",
                id: 70,
                is_deleted: "0",
                thumbnail: null,
                title: "IMG_20220831_221255.jpg",
                type: "photo",
                updated_at: "2022-09-05T09:59:16.000000Z",
                user_id: "5"
            }, {
                created_at: "2022-09-06T13:51:56.000000Z",
                file_url: "http://livelikeyouaredying.com/uploads/gallery/gallery_photo_userid_5_1662472316.jpg",
                from: "local",
                id: 82,
                is_deleted: "0",
                thumbnail: null,
                title: "IMG_20220904_071558.jpg",
                type: "photo",
                updated_at: "2022-09-06T13:51:56.000000Z",
                user_id: "5"
            }
        ]
    );

    useEffect(() => {
        console.log('Get music api is called ', data);
        if (data != null && status == 'success') {
            let temp = [];
            data.contents.forEach((item) => {
                temp.push({
                    id: item.id,
                    url: hostname + item.file_url,
                    title: item.title
                })
            })
            setPhoto(temp)
        }
    }, [data])
    const renderItem = ({ item }) => {
        return (
            <PhotoCard item={item} />
        );
    }
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
        <SafeAreaView style={styles.tabContent}>
            <MasonryList
                style={{
                }}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={<View />}
                contentContainerStyle={{
                    alignSelf: 'stretch',
                }}
                numColumns={2}
                data={photo}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}
const renderScene = SceneMap({
    first: () => <MusicRoute text={'My test props'} />,
    second: () => < VideoRoute />,
    third: () => <PhotoRoute />
});

const SharedLifeVideoScreen = ({ navigation }) => {
    const { loading, login } = useContext(AuthContext);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'music' },
        { key: 'second', title: 'video' },
        { key: 'third', title: 'photo' }
    ]);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            activeColor={Colors.black}
            inactiveColor={Colors.black}
            tabStyle={{
                elevation: 0,
            }}
            indicatorStyle={{
                borderBottomWidth: scale(3),
                paddingHorizontal: scale(0),
                borderColor: Colors.primaryColor,
            }}
            indicatorContainerStyle={{
                backgroundColor: Colors.white,
            }}
            style={{
                elevation: 0,
                shadowColor: Colors.white,
                shadowOpacity: 0.4,
                shadowRadius: scale(6),
            }}
        />
    );

    return (
        <View style={styles.container}>
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
                                navigation.navigate("SharedUserHome")
                            }}
                        />
                        <Text style={styles.notetext}>{'Micle John'}</Text>
                    </View>
                    <Image
                        source={Images.ic_logo}
                        style={styles.logo}
                        resizeMode={'contain'}
                    />
                </View>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                />
            </View>
        </View>
    )
}
export default SharedLifeVideoScreen;
