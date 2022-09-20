import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';
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
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


const SongRoute = () => {
    return (
        <Text style={{
            backgroundColor: 'red'
        }}>song route</Text>
    )
}
const PeopleRoute = () => {
    return (
        <Text>song route</Text>
    )
}
const MediaRoute = () => {
    return (
        <Text>song route</Text>
    )
}
const renderScene = SceneMap({
    first: SongRoute,
    second: PeopleRoute,
    third: MediaRoute
});

const SharedTopWishScreen = ({ navigation }) => {
    const { loading, login } = useContext(AuthContext);
    const [testReminderModal, setTestReminderModal] = useState(false);
    const [isVisibleSendEmailModal, setIsVisibleEmailModal] = useState(false);
    const [emailAddress, SetEmailAddress] = useState('');
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'song' },
        { key: 'second', title: 'people' },
        { key: 'third', title: 'media' }
    ]);
    const topWIshList = [
        { id: 1, content: "Get VP Title" },
        { id: 2, content: "Bora Bora" },
        { id: 3, content: "Get to 170 lbs" },
        { id: 4, content: "Help Poor with electricity" },
        { id: 5, content: "Take Grandkids to Disney World" },
    ];
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
                    {/* <View style={styles.userInfo}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={{ uri: 'https://api.lorem.space/image/face?w=450&amp;amp;amp;amp;h=660' }}
                                style={styles.avatar}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={styles.userInfoRight}>
                            <View style={styles.lifeSpanWrapper}>
                                <Text style={styles.lifeSpan}>{'81'}</Text>
                            </View>
                            <View style={styles.birthdayWrapper}>
                                <Text style={styles.birthday}>{'May, 1997'}</Text>
                            </View>
                        </View>
                    </View> */}
                    <View style={styles.topWishBadgeWrapper}>
                        <Text style={styles.topWishBadge}>{'Top wish'}</Text>
                    </View>
                    <ScrollView style={styles.topWish}>
                        <ScrollView style={styles.topWishBody}>
                            {topWIshList.map((item) => (
                                <View style={styles.topWishItem} key={item.id}>
                                    <View style={styles.topWishIdWrapper}>
                                        <Text style={styles.topWishId}>{item.id}</Text>
                                    </View>
                                    <View style={styles.topWishContentWrapper}>
                                        <Text style={styles.topWishContent}>{item.content}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </ScrollView>
                    <View style={styles.nextButtonWrapper}>
                        <OutlineButton
                            title="Next"
                            loading={false}
                            onPress={() => {
                                navigation.navigate('SharedFuneralSong');
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SharedTopWishScreen;
