import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { AuthContext } from '../../AuthProvider';
import InlineContainer from '../../components/InlineContainer';
import IconButton from '../../components/IconButton';
import { scale, scaleVertical } from '../../utils/scale';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import GalleryItemContainer from '../../components/GalleryItemContainer';
import VideoPlayerModal from '../../components/VideoPlayerModal';
import MusicPlayerModal from '../../components/MusicPlayerModal';
import MasonryList from '@react-native-seoul/masonry-list';
import YoutubeVideoSelectModal from '../../components/YoutubeVideoSelectModal';
import { useQuery, useMutation } from 'react-query';
import API from '../../services/API';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const hostname = 'http://livelikeyouaredying.com/uploads/gallery/';
const icMusic = 'http://livelikeyouaredying.com/assets/images/ic_music_symbol_v2.png';
const icVideo = 'http://livelikeyouaredying.com/assets/images/videoplay_v1.png';

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

const MusicCard = ({
  item,
  musics,
  handleDelete,
  disablePlayButton,
  setDisablePlayButton,
  currentSelectedId,
  setCurrentSelectedId
}) => {
  const [muisicPlayerModal, setMusicPlayerModal] = useState(false);
  const [hideRemoveButton, setHideRemoveButton] = useState(true);
  console.log('resresh function is called.')
  return (
    <>
      <TouchableOpacity
        style={{
          position: 'relative'
        }}
        onPress={() => {
          if (currentSelectedId > -1 && currentSelectedId === item.id) {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa=>')
            setDisablePlayButton(false);
            setHideRemoveButton(true);
            setCurrentSelectedId(-1)
          } else {
            console.log('bbbbbbbbbbbbbbbbbbbbbbb=>')
          }
        }}
        onLongPress={() => {
          if (currentSelectedId === -1) {
            setDisablePlayButton(true);
            setHideRemoveButton(false);
            setCurrentSelectedId(item.id)
            console.log('Long Press function.')
          }
        }}
      >
        <View
          key={item.id.toString()}
          style={styles.cardStyle}>
          {
            !hideRemoveButton &&
            <View
              style={{
                position: 'absolute',
                right: scale(10),
                top: scale(10)
              }}>
              <IconButton
                icon={Images.ic_remove}
                width={scale(24)}
                height={scale(24)}
                onPress={() => {
                  setDisablePlayButton(false);
                  setHideRemoveButton(true);
                  setCurrentSelectedId(-1)
                  handleDelete(item.id);
                  console.log('remove button is clicked. ', item.id)
                }}
                disabled={false}
              />
            </View>
          }
          <GalleryItemContainer
            url={icMusic}
            width={scale(50)}
            height={scale(50)}
            disabled={disablePlayButton}
            onPress={() => {
              setMusicPlayerModal(true)
              console.log(item.url)
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

const MusicRoute = () => {
  const { userProfile } = useContext(AuthContext);
  const userId = userProfile.result.id;
  const [musics, setMusics] = useState([]);
  const [disablePlayButton, setDisablePlayButton] = useState(false);
  const [currentSelectedId, setCurrentSelectedId] = useState(-1);
  const { data: dataMusic, isLoading: isLoading1, status } = useQuery(['getMusciGallery', userId], () => API.getMediaByUserId(userId, 'gallery', 'music'));
  const { mutate: deleteMusic, isLoading: isLoading2 } = useMutation(API.deleteMediaById, {
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Music is removed successfully.',
        text2: data.message
      })
    },
    onerror: (data) => {
      Toast.show({
        type: 'error',
        text1: 'sorry',
        text2: data.message
      })
    }
  })

  const renderItem = ({ item }) => {
    return <MusicCard
      item={item}
      musics={musics}
      handleDelete={handleDelete}
      disablePlayButton={disablePlayButton}
      setDisablePlayButton={setDisablePlayButton}
      currentSelectedId={currentSelectedId}
      setCurrentSelectedId={setCurrentSelectedId}
    />;
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm",
      'Are you sure want to remove this music?',
      [
        {
          text: 'ok',
          onPress: () => {
            let temp = [...musics];
            delItemFromJson(temp, 'id', id);
            setPhotos(temp);
            deleteMusic(['gallery', id]);
          }
        },
        {
          text: 'cancel',
          onPress: () => {
            console.log('you clicked the cancel button ');
          },
          style: 'cancel'
        }
      ]
    )
  }

  useEffect(() => {
    console.log('Get music api is called ', dataMusic);
    if (dataMusic != null && status == 'success') {
      let temp = [];
      dataMusic.contents.forEach((item) => {
        temp.push({
          id: item.id,
          url: hostname + item.file_url,
          title: item.title
        })
      })
      setMusics(temp)
    }
  }, [dataMusic])

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

const VideoCard = ({
  item,
  handleDelete,
  disablePlayButton,
  setDisablePlayButton,
  currentSelectedId,
  setCurrentSelectedId }) => {
  const [videoPlayerModal, setVideoPlayerModal] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [hideRemoveButton, setHideRemoveButton] = useState(true);
  return (
    <>
      <TouchableOpacity
        style={{
          position: 'relative'
        }}
        onPress={() => {
          if (currentSelectedId > -1 && currentSelectedId === item.id) {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa=>')
            setDisablePlayButton(false);
            setHideRemoveButton(true);
            setCurrentSelectedId(-1)
          } else {
            console.log('bbbbbbbbbbbbbbbbbbbbbbb=>')
          }
        }}
        onLongPress={() => {
          if (currentSelectedId === -1) {
            setDisablePlayButton(true);
            setHideRemoveButton(false);
            setCurrentSelectedId(item.id)
            console.log('Long Press function.')
          }
        }}
      >
        <View
          key={item.id.toString()}
          style={styles.cardStyle}>
          {
            !hideRemoveButton &&
            <View
              style={{
                position: 'absolute',
                right: scale(10),
                top: scale(10)
              }}>
              <IconButton
                icon={Images.ic_remove}
                width={scale(24)}
                height={scale(24)}
                disabled={false}
                onPress={() => {
                  setDisablePlayButton(false);
                  setHideRemoveButton(true);
                  setCurrentSelectedId(-1)
                  handleDelete(item.id);
                  console.log('remove button is clicked. ', item.id)
                }}
              />
            </View>
          }
          <GalleryItemContainer
            url={icVideo}
            width={scale(50)}
            height={scale(50)}
            disabled={disablePlayButton}
            onPress={() => {
              setCurrentUrl(item.url);
              setVideoPlayerModal(true);
              console.log(item.url);
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

const VideoRoute = () => {
  const { userProfile } = useContext(AuthContext);
  const userId = userProfile.result.id; deleteVideo
  console.log('user id is ', userId);
  const [isVisiblYoutubeSelectModal, setIsVisiblYoutubeSelectModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [disablePlayButton, setDisablePlayButton] = useState(false);
  const [currentSelectedId, setCurrentSelectedId] = useState(-1);
  const { data: dataVideo, isLoading: isLoading1, status } = useQuery(['getGalleryVideo', userId], () => API.getMediaByUserId(userId, 'gallery', 'video'));
  const { mutate: deleteVideo, isLoading: isLoading2 } = useMutation(API.deleteMediaById, {
    onSuccess: (data) => {
      console.log('delete video api is called ', data);
      Toast.show({
        type: 'success',
        text1: 'Video is deleted successfully.',
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
  })

  useEffect(() => {
    console.log('======================> ', dataVideo);
    if (dataVideo != null && status == 'success') {
      let temp = [];
      dataVideo.contents.forEach((item) => {
        temp.push({
          id: item.id,
          url: hostname + item.file_url,
          title: item.title
        })
      })
      setVideos(temp);
    }
  }, [dataVideo])

  const renderItem = ({ item }) => {
    return <VideoCard
      item={item}
      handleDelete={handleDelete}
      disablePlayButton={disablePlayButton}
      setDisablePlayButton={setDisablePlayButton}
      currentSelectedId={currentSelectedId}
      setCurrentSelectedId={setCurrentSelectedId}
    />;
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm",
      'Are you sure want to remove this video?',
      [
        {
          text: 'ok',
          onPress: () => {
            let temp = [...videos];
            delItemFromJson(temp, 'id', id);
            setVideos(temp);
            deleteVideo(['gallery', id]);
          }
        },
        {
          text: 'cancel',
          onPress: () => {
            console.log('you clicked the cancel button ');
          },
          style: 'cancel'
        }
      ]
    )
  };

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

const PhotoCard = ({
  item,
  handleDelete,
  currentSelectedId,
  setCurrentSelectedId
}) => {
  const [hideRemoveButton, setHideRemoveButton] = useState(true);

  return (
    <TouchableOpacity
      style={{
        position: 'relative'
      }}
      onPress={() => {
        if (currentSelectedId > -1 && currentSelectedId === item.id) {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa=>')
          setHideRemoveButton(true);
          setCurrentSelectedId(-1)
        } else {
          console.log('bbbbbbbbbbbbbbbbbbbbbbb=>')
        }
      }}
      onLongPress={() => {
        if (currentSelectedId === -1) {
          setHideRemoveButton(false);
          setCurrentSelectedId(item.id)
          console.log('Long Press function.')
        }
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
          height: scale(180),
          overflow: 'hidden'
        }}
      >
        <GalleryItemContainer
          url={item.url}
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
              icon={Images.ic_remove}
              width={scale(24)}
              height={scale(24)}
              disabled={false}
              onPress={() => {
                setHideRemoveButton(true);
                setCurrentSelectedId(-1);
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

const PhotoRoute = () => {
  const { userProfile } = useContext(AuthContext);
  const userId = userProfile.result.id;
  console.log('Photo current user is ', userId);

  const [currentSelectedId, setCurrentSelectedId] = useState(-1)
  const [photos, setPhotos] = useState([]);
  const { data: dataPhoto, isLoading: isLoading1, status } = useQuery(['getPhotoGallery', userId], () => API.getMediaByUserId(userId, 'gallery', 'photo'));
  const { mutate: deletePhoto, isLoading: isLoading2 } = useMutation(API.deleteMediaById, {
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Photo is deleted successfully.',
        text2: data.message
      })
    },
    onError: (data) => {
      Toast.show({
        type: 'error',
        text1: 'Sorry',
        text2: data.message
      })
    }
  })

  const renderItem = ({ item }) => {
    return <PhotoCard
      item={item}
      handleDelete={handleDelete}
      currentSelectedId={currentSelectedId}
      setCurrentSelectedId={setCurrentSelectedId}
    />
  }

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm",
      'Are you sure want to remove this video?',
      [
        {
          text: 'ok',
          onPress: () => {
            let temp = [...photos];
            delItemFromJson(temp, 'id', id);
            setPhotos(temp);
            deletePhoto(['gallery', id]);
          }
        },
        {
          text: 'cancel',
          onPress: () => {
            console.log('you clicked the cancel button ');
          },
          style: 'cancel'
        }
      ]
    )
  }

  useEffect(() => {
    console.log('get phot api is called ', dataPhoto);
    if (dataPhoto != null && status == 'success') {
      let temp = [];
      dataPhoto.contents.forEach((item) => {
        temp.push({
          id: item.id,
          url: hostname + item.file_url,
          title: item.title
        })
      });
      setPhotos(temp);
    }
  }, [dataPhoto])

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
