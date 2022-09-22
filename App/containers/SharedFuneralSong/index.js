import * as React from 'react';
import { useState, useContext, useRef } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StyleSheet
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


const OpenRoute = ({ text }) => {
    const [sharedOpenSong, setSharedOpenSong] = useState([
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
    const [sharedProcessionSong, setSharedProcessionSong] = useState([
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
    const { loading, login } = useContext(AuthContext);
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
export default SharedFuneralSongScreen;
