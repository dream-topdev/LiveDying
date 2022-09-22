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
import SpeakerContainer from '../../components/SpeakerContainer';
import PallbearerContainer from '../../components/PallbearerContainer';


const SpeakerRoute = ({ text }) => {
    const [sharedSpeaker, setSharedSpeaker] = useState([
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/speaker_userid_5_1662602470.png",
            created_at: "2022-07-26T22:20:05.000000Z",
            first_name: "Miclesdsdfs",
            id: 64,
            last_name: "Jhondfsdf",
            topic: "I am aslo sad to his passing away",
            updated_at: "2022-09-08T02:01:10.000000Z",
            user_id: "5"
        },
        {
            avatar: null,
            created_at: "2022-07-27T01:28:33.000000Z",
            first_name: "Micle",
            id: 65,
            last_name: "Jhonafadsfasdfasd",
            topic: "I am aslo sad to his passing away",
            updated_at: "2022-09-08T08:09:39.000000Z",
            user_id: "5"
        },
        {
            avatar: null,
            created_at: "2022-07-29T00:43:12.000000Z",
            first_name: "Update_speaker",
            id: 68,
            last_name: "last_name_update",
            topic: "Update speaker topic",
            updated_at: "2022-09-08T08:08:22.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/speaker_userid_5_1662584222.jpg",
            created_at: "2022-09-07T20:57:02.000000Z",
            first_name: "aaa",
            id: 69,
            last_name: "aa",
            topic: "aaaaa",
            updated_at: "2022-09-07T20:57:02.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/speaker_userid_5_1662588671.jpg",
            created_at: "2022-09-07T22:11:11.000000Z",
            first_name: "a",
            id: 70,
            last_name: "d",
            topic: "n",
            updated_at: "2022-09-07T22:11:11.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/speaker_userid_5_1662589398.jpg",
            created_at: "2022-09-07T22:23:18.000000Z",
            first_name: "aaa",
            id: 71,
            last_name: "bb",
            topic: "acc",
            updated_at: "2022-09-07T22:23:18.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/speaker_userid_5_1662589659.jpg",
            created_at: "2022-09-07T22:27:39.000000Z",
            first_name: "ddd",
            id: 72,
            last_name: "ddd",
            topic: "a",
            updated_at: "2022-09-07T22:27:39.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/speaker_userid_5_1662623481.png",
            created_at: "2022-09-08T07:50:15.000000Z",
            first_name: "Anton_tested_emptyaaaaaa",
            id: 78,
            last_name: "aaaaaaa",
            topic: "aaa",
            updated_at: "2022-09-08T07:51:21.000000Z",
            user_id: "5"
        }
    ]);
    const renderItem = ({ item }) => {
        return (
            <SpeakerContainer
                key={item.id.toString()}
                thumbnail={item.avatar}
                speakerName={`${item.first_name} ${item.last_name}`}
                speakerTopic={item.topic}
                isRemove={false}
            />
        );
    }
    return (
        <SafeAreaView style={styles.tabContent}>
            <MasonryList
                ListHeaderComponent={<View />}
                contentContainerStyle={{
                    alignSelf: 'stretch',
                }}
                numColumns={1}
                data={sharedSpeaker}
                renderItem={renderItem}
            />
        </SafeAreaView >
    );
}
const PallbearerRoute = ({ text }) => {
    const [sharedProcessionSong, setSharedProcessionSong] = useState([
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/pallbearer_userid_5_1662624480.jpg",
            created_at: "2022-07-26T22:33:35.000000Z",
            first_name: "Jackson",
            id: 45,
            last_name: "Hunter",
            updated_at: "2022-09-08T08:08:00.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/pallbearer_userid_5_1662624468.png",
            created_at: "2022-07-27T02:06:38.000000Z",
            first_name: "Up",
            id: 48,
            last_name: "S",
            updated_at: "2022-09-08T08:07:48.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/pallbearer_userid_5_1662612626.jpg",
            created_at: "2022-09-08T04:50:26.000000Z",
            first_name: "Anton",
            id: 54,
            last_name: "Hrytsiuk",
            updated_at: "2022-09-08T04:50:26.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/pallbearer_userid_5_1662613787.jpg",
            created_at: "2022-09-08T05:09:47.000000Z",
            first_name: "A",
            id: 55,
            last_name: "DFASDFASD",
            updated_at: "2022-09-08T05:09:47.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/pallbearer_userid_5_1662620153.jpg",
            created_at: "2022-09-08T06:55:53.000000Z",
            first_name: "sa",
            id: 56,
            last_name: "as",
            updated_at: "2022-09-08T06:55:53.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/pallbearer_userid_5_1662623035.jpg",
            created_at: "2022-09-08T07:34:36.000000Z",
            first_name: "Anton_empty_avatar",
            id: 57,
            last_name: "test",
            updated_at: "2022-09-08T07:43:55.000000Z",
            user_id: "5"
        },
        {
            avatar: "http://livelikeyouaredying.com/uploads/avatar/pallbearer_userid_5_1662622932.jpg",
            created_at: "2022-09-08T07:39:02.000000Z",
            first_name: "aaaaa",
            id: 58,
            last_name: "avvvva",
            updated_at: "2022-09-08T07:42:12.000000Z",
            user_id: "5"
        },
        {
            avatar: null,
            created_at: "2022-09-08T07:42:23.000000Z",
            first_name: "adsfasdadsfaaaa",
            id: 59,
            last_name: "asdfasdfasdfaaa",
            updated_at: "2022-09-08T07:55:25.000000Z",
            user_id: "5"
        }
    ]);
    const renderItem = ({ item }) => {
        return (
            <PallbearerContainer
                key={item.id}
                thumbnail={item.avatar}
                name={item.first_name + ' ' + item.last_name}
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

const renderScene = SceneMap({
    first: () => <SpeakerRoute text={'My test props'} />,
    second: () => < PallbearerRoute />
});

const SharedSpeakerScreen = ({ navigation }) => {
    const { loading, login } = useContext(AuthContext);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Speaker' },
        { key: 'second', title: 'Pallbearer' }
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
export default SharedSpeakerScreen;
