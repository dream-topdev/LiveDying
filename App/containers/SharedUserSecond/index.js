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


const SongRoute = ({ text }) => {

    return (
        <Text >song route {text}</Text>
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
    first: () => <SongRoute text={'My test props'} />,
    second: () => < PeopleRoute />,
    third: () => <MediaRoute />
});

const SharedUserSecondScreen = ({ navigation }) => {
    const { loading, login } = useContext(AuthContext);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'song' },
        { key: 'second', title: 'people' },
        { key: 'third', title: 'media' }
    ]);

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            activeColor={Colors.black}
            inactiveColor={Colors.black}
            tabStyle={{
                fontSize: scale(24)
            }}
            indicatorStyle={{
                borderBottomWidth: scale(3),
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
            {/* <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}> */}
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
                                    navigation.navigate("ShareHome")
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
                    <View style={styles.funeralInfo}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            renderTabBar={renderTabBar}
                            onIndexChange={setIndex}
                        />
                    </View>
                </View>
            {/* </KeyboardAwareScrollView> */}
        </View>
    )
}
export default SharedUserSecondScreen;
