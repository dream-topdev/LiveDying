import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
} from 'react-native';
import { AuthContext } from '../../AuthProvider';
import IconButton from '../../components/IconButton';
import { scale, scaleVertical } from '../../utils/scale';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MasonryList from '@react-native-seoul/masonry-list';
import SongItemContainer from '../../components/SongItemContainer';
import API from '../../services/API';
import { useQuery, useMutation } from 'react-query';


const OpenRoute = ({ text }) => {
    const { friendProfile } = useContext(AuthContext)
    const friendid = friendProfile.result.id;
    const [sharedOpenSong, setSharedOpenSong] = useState([]);
    const { data, isLoading, status, refetch } = useQuery(['getMediaByFriendIdOpen', friendid], () => API.getMediaByUserId(friendid, 'song', 'open'));

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
            setSharedOpenSong(temp)
        }
    }, [data])

    const renderItem = ({ item }) => {
        return (
            <SongItemContainer
                key={item.id}
                thumbnail={item.thumbnail}
                songTitle={item.title}
                songArtist={'Frank Sintra'}
                songTime={'4 : 54'}
                isRemove={false}
            />
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
                numColumns={1}
                data={sharedOpenSong}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}
const ProcessionRoute = ({ text }) => {
    const { friendProfile } = useContext(AuthContext)
    const friendid = friendProfile.result.id;
    const { data, isLoading, status, refetch } = useQuery(['getMediaByFriendIdProcess', friendid], () => API.getMediaByUserId(friendid, 'song', 'process'));
    const [sharedProcessionSong, setSharedProcessionSong] = useState([]);

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
            setSharedProcessionSong(temp)
        }
    }, [data]);

    const renderItem = ({ item }) => {
        return (
            <SongItemContainer
                key={item.id}
                thumbnail={item.thumbnail}
                songTitle={item.title}
                songArtist={'Frank Sintra'}
                songTime={'4 : 54'}
                isRemove={false}
            />
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
                numColumns={1}
                data={sharedProcessionSong}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}
const CloseRoute = () => {
    const { friendProfile } = useContext(AuthContext)
    const friendid = friendProfile.result.id;
    const { data, isLoading, status, refetch } = useQuery(['getMediaByFriendIdClose', friendid], () => API.getMediaByUserId(friendid, 'song', 'close'));
    const [sharedCloseSong, setSharedCloseSong] = useState([
        {
            fileUrl: "https://www.youtube.com/watch?v=zYrED1KokgE",
            from: "youtube",
            id: 64,
            thumbnail: "https://i.ytimg.com/vi/zYrED1KokgE/default.jpg",
            title: "【網知系列 EP07】JQuery是什麼？和JavaScript有些麼差異呢？",
            type: "open",
            userId: "5"
        },
        {
            fileUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
            from: "youtube",
            id: 68,
            thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/default.jpg",
            title: "Learn JavaScript - Full Course for Beginners",
            type: "open",
            userId: "5"
        },
        {
            fileUrl: "https://www.youtube.com/watch?v=3nrLc_JOF7k",
            from: "youtube",
            id: 69,
            thumbnail: "https://i.ytimg.com/vi/3nrLc_JOF7k/default.jpg",
            title: "jQuery Crash Course [1] - Intro &amp; Selectors",
            type: "open",
            userId: "5"
        },
        {
            fileUrl: "song_open_userid_5_1662394502.mp4",
            from: "local",
            id: 70,
            thumbnail: "http://livelikeyouaredying.com/assets/images/default/music.png",
            title: "TestVideo_3.mp4",
            type: "open",
            userId: "5"
        },
        {
            fileUrl: "song_open_userid_5_1662395470.mp4",
            from: "local",
            id: 71,
            thumbnail: "http://livelikeyouaredying.com/assets/images/default/music.png",
            title: "TestVideo_1.mp4",
            type: "open",
            userId: "5"
        }
    ]);

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
            setSharedCloseSong(temp)
        }
    }, [data]);

    const renderItem = ({ item }) => {
        return (
            <SongItemContainer
                key={item.id}
                thumbnail={item.thumbnail}
                songTitle={item.title}
                songArtist={'Frank Sintra'}
                songTime={'4 : 54'}
                isRemove={false}
            />
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
                numColumns={1}
                data={sharedCloseSong}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}
const renderScene = SceneMap({
    first: () => <OpenRoute text={'My test props'} />,
    second: () => < ProcessionRoute />,
    third: () => <CloseRoute />
});

const SharedFuneralSongScreen = ({ navigation }) => {
    const { friendProfile } = useContext(AuthContext)
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'open' },
        { key: 'second', title: 'procession' },
        { key: 'third', title: 'close' }
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
            scrollEnabled={true}
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
                        <Text style={styles.notetext}>
                            {
                                friendProfile.result.first_name +
                                ' ' +
                                friendProfile.result.last_name
                            }
                        </Text>
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
export default SharedFuneralSongScreen;
