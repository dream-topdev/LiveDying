import * as React from 'react';
import { useState, useContext, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  useColorScheme,
  StatusBar
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import VideoPlayer from 'react-native-video-controls';
import TrackPlayer from "react-native-track-player"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import OutlineButton from '../../components/OutlineButton';
import InlineContainer from '../../components/InlineContainer';
import ActionButton from '../../components/ActionButton';
import IconButton from '../../components/IconButton';
import { scale, scaleVertical } from '../../utils/scale';
import AuthInput from '../../components/AuthInput';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import GalleryItemContainer from '../../components/GalleryItemContainer';
import VideoPlayerModal from '../../components/VideoPlayerModal';
import MusicPlayerModal from '../../components/MusicPlayerModal';
import MasonryList from '@react-native-seoul/masonry-list';

const hostname = 'http://livelikeyouaredying.com/uploads/gallery/';
const icMusic = 'http://livelikeyouaredying.com/assets/images/ic_music_symbol_v2.png';
const icVideo = 'http://livelikeyouaredying.com/assets/images/videoplay_v1.png';


const musics = [
  {
    id: 0,
    url: hostname + 'gallery_music_userid_4_1656820163.mp3',
    title: "My Way",
  },
  {
    id: 1,
    url: hostname + 'gallery_music_userid_4_1656820163.mp3',
    title: "My Way",
  },
  {
    id: 2,
    url: hostname + 'gallery_music_userid_4_1656820163.mp3',
    title: "You Raise Me Up",
  },
  {
    id: 3,
    url: hostname + 'gallery_music_userid_4_1656820163.mp3',
    title: "If I Die Young",
  },
  {
    id: 4,
    url: hostname + 'gallery_music_userid_4_1656820163.mp3',
    title: "The Funeral",
  },
  {
    id: 5,
    url: hostname + 'gallery_music_userid_4_1656820163.mp3',
    title: "Supermarket Flowers",
  }
];
const videos = [
  {
    id: 0,
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    title: "bandicam 2022-05-26 16-30-11-462",
  },
  {
    id: 1,
    url: hostname + 'gallery_video_userid_5_1656719676.mp4',
    title: "IMG_0417 (1)",
  },
  {
    id: 2,
    url: hostname + 'gallery_video_userid_4_1656811158.mp4',
    title: "bandicam 2022-04-03 08-10-10-541",
  },
  {
    id: 3,
    url: hostname + 'gallery_video_userid_4_1656811173.mp4',
    title: "bandicam 2022-04-03 08-10-10-541",
  }
];
const photos = [
  {
    id: 0,
    url: hostname + 'gallery_photo_userid_4_1656466481.jpg',
    title: "Venz",
  },
  {
    id: 1,
    url: hostname + 'gallery_photo_userid_4_1656466639.jpg',
    title: "Audi",
  },
  {
    id: 2,
    url: hostname + 'gallery_photo_userid_4_1656810970.png',
    title: "Ford",
  },
  {
    id: 3,
    url: hostname + 'gallery_photo_userid_4_1656466634.jpg',
    title: "Lexas",
  },
  {
    id: 4,
    url: hostname + 'gallery_photo_userid_4_1656466639.jpg',
    title: "Nissan",
  },
];
const MusicCard = ({ item, id }) => {
  const [muisicPlayerModal, setMusicPlayerModal] = useState(false);
  return (
    <>
      <View
        key={item.id.toString()}
        onPress={() => {
          console.log('aaaaaaaaaaaaaaaaaaaaaa');
        }}
        style={{
          backgroundColor: Colors.secondaryBackColor,
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          borderColor: Colors.primaryColor,
          borderWidth: scale(3),
          borderRadius: scale(10),
          marginTop: scale(10),
          marginHorizontal: scale(5),
          height: scale(150),
        }}>
        <GalleryItemContainer
          url={icMusic}
          width={scale(50)}
          height={scale(50)}
          onPress={() => {
            setMusicPlayerModal(true)
            console.log(item.url)
          }}
        />
        <Text style={styles.musicTitle}>{item.title}</Text>
      </View>
      <MusicPlayerModal
        tracks={musics}
        visible={muisicPlayerModal}
        onClose={() => setMusicPlayerModal(false)}
      />
    </>
  );
};

const MusicRoute = () => {
  const renderItem = ({ item }) => {
    return <MusicCard
      item={item}
      id={item.id}
    />;
  };
  return (
    <SafeAreaView style={styles.tabContent}>
      <MasonryList
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          alignSelf: 'stretch',
        }}
        numColumns={2}
        data={musics}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
};

const VideoCard = ({ item, id }) => {
  const [videoPlayerModal, setVideoPlayerModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  return (
    <>
      <View
        key={item.id.toString()}
        style={{
          flex: 1,
          backgroundColor: Colors.secondaryBackColor,
          height: scale(150),
          justifyContent: 'space-around',
          alignItems: 'center',
          borderColor: Colors.primaryColor,
          borderWidth: scale(3),
          borderRadius: scale(10),
          marginTop: scale(10),
          marginHorizontal: scale(5),
        }}>
        <GalleryItemContainer
          url={icVideo}
          width={scale(50)}
          height={scale(50)}
          onPress={() => {
            setCurrentUrl(item.url);
            console.log(item.url);
            setVideoPlayerModal(true);
          }}
        />
        <Text style={styles.musicTitle}>{item.title}</Text>
      </View>
      <VideoPlayerModal
        url={currentUrl}
        visible={videoPlayerModal}
        onClose={() => setVideoPlayerModal(false)}
      />
    </>
  );
}

const VideoRoute = () => {
  const renderItem = ({ item }) => {
    return <VideoCard
      item={item}
      id={item.id}
    />;
  };
  return (
    <SafeAreaView style={styles.tabContent}>
      <MasonryList
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          alignSelf: 'stretch',
        }}
        numColumns={2}
        data={videos}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
};

const PhotoCard = ({ item, id }) => {
  return (
    <View
      key={item.id.toString()}
      style={{
        flex: 1,
        height: scale(180),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(10),
        marginHorizontal: scale(5)
      }}
    >
      <GalleryItemContainer
        url={item.url}
        width={'100%'}
        height={scale(150)}
        onPress={() => {
          console.log('You clicked' + item.url)
        }}
      />
      <Text style={styles.iamgeTitle}>{item.title}</Text>
    </View >
  )
};

const PhotoRoute = () => {
  const renderItem = ({ item }) => {
    return <PhotoCard
      item={item}
      id={item.id}
    />
  }
  return (
    <SafeAreaView style={styles.tabContent}>
      <MasonryList
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          alignSelf: 'stretch',
        }}
        numColumns={2}
        data={photos}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
};

const renderScene = SceneMap({
  first: MusicRoute,
  second: VideoRoute,
  third: PhotoRoute
});

const GalleryScreen = ({ navigation }) => {
  const { loading, login } = useContext(AuthContext);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Music' },
    { key: 'second', title: 'Video' },
    { key: 'third', title: 'Photo' }
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={Colors.black}
      inactiveColor={Colors.black}
      tabStyle={{
        fontSize: scale(21) // This is not working and  I have to fix it and I will ping yo wen IU have done it 
      }}
      indicatorStyle={{
        borderBottomWidth: scale(3),
        borderColor: Colors.primaryColor
      }}
      indicatorContainerStyle={{
        backgroundColor: Colors.white,
      }}
      style={{
        elevation: 0,
        shadowColor: Colors.white,
        // shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: scale(6)
      }}
    />
  );
  return (
    <View style={styles.container}>
      {/* <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}> */}
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
            title={'Life Video:'}
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
                    console.log('You clicked the youtube button');
                  }}
                />
              </View>
            }
          />
        </View>
        <View style={styles.songList}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.footerInner}>
            <IconButton
              icon={Images.ic_back}
              width={52}
              height={52}
              onPress={() => {
                console.log('You clicked the back button')
                navigation.navigate('Speaker')
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
                console.log('You clicked the next button')
                navigation.navigate('SongClose')
              }}
            />
          </View>
        </View>
      </View>
      {/* </KeyboardAwareScrollView> */}
    </View>
  )
}
export default GalleryScreen;
