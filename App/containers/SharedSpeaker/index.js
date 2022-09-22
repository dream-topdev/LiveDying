import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
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
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import TextContainer from '../../components/TextContainer';
import SpeakerContainer from '../../components/SpeakerContainer';
import SongItemContainer from '../../components/SongItemContainer';
import PallbearerContainer from '../../components/PallbearerContainer';
import API from '../../services/API';
import { useQuery, useMutation } from 'react-query';

const SpeakerRoute = ({ }) => {
    const { friendProfile } = useContext(AuthContext)
    const friendid = friendProfile.result.id;
    const { data, isLoading, status, refetch } = useQuery(['getSpeakerFriendId', friendid], () => API.getSpeakerByUserId(friendid));
    const [sharedSpeaker, setSharedSpeaker] = useState([]);

    useEffect(() => {
        if (data != null && status == 'success') {
            let temp = [];
            console.log('I am expert =========<================>====>', data)
            data.contents.forEach((item) => {
                temp.push(
                    {
                        id: item.id,
                        avatar: item.avatar,
                        firstName: item.first_name,
                        lastName: item.last_name,
                        topic: item.topic,
                        userId: item.user_id
                    }
                )
            })
            setSharedSpeaker(temp)
        }
    }, [data]);

    const renderItem = ({ item }) => {
        return (
            <SpeakerContainer
                key={item.id.toString()}
                thumbnail={item.avatar}
                speakerName={`${item.firstName} ${item.lastName}`}
                speakerTopic={item.topic}
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
                keyExtractor={(item) => item.id.toString()}
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
const PallbearerRoute = ({ }) => {
    const { friendProfile } = useContext(AuthContext)
    const friendid = friendProfile.result.id;
    const [sharedProcessionSong, setSharedProcessionSong] = useState([]);
    const { data, isLoading, status, refetch } = useQuery(['getPallbearerByFriendId', friendid], () => API.getPallbearerByUserId(friendid));

    useEffect(() => {
        console.log('api call reault', data)
        if (data != null && status == 'success') {
            let temp = [];
            data.contents.forEach((item) => {
                temp.push(
                    {
                        id: item.id,
                        avatar: item.avatar,
                        firstName: item.first_name,
                        lastName: item.last_name,
                        userId: item.user_id
                    }
                )
            })
            setSharedProcessionSong(temp)
        }
    }, [data])

    const renderItem = ({ item }) => {
        return (
            <PallbearerContainer
                key={item.id.toString()}
                thumbnail={item.avatar}
                name={item.firstName + ' ' + item.lastName}
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
    first: () => <SpeakerRoute />,
    second: () => < PallbearerRoute />
});

const SharedSpeakerScreen = ({ navigation }) => {
    const { friendProfile } = useContext(AuthContext);
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
                        <Text style={styles.notetext}>
                            {
                                friendProfile.result.first_name +
                                " " +
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
export default SharedSpeakerScreen;
