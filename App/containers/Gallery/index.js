import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    Pressable,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import OutlineButton from '../../components/OutlineButton';
import InlineContainer from '../../components/InlineContainer';
import ActionButton from '../../components/ActionButton';
import IconButton from '../../components/IconButton';
import SpeakerContainer from '../../components/SpeakerContainer';
import { scale, scaleVertical } from '../../utils/scale';
import AuthInput from '../../components/AuthInput';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';
import PagerView from 'react-native-pager-view';


const Col = ({ numRows, children }) => {
    return (
        <View style={styles[`${numRows}col`]}>{children}</View>
    )
}

const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
)

const GalleryScreen = ({ navigation }) => {
    const { loading, login } = useContext(AuthContext);
    const [testReminderModal, setTestReminderModal] = useState(false);
    const [userName, setUserName] = useState("");
    const [topWishList, setTopWishList] = useState([
        'Get VP Title',
        'Bora Bora',
        'Get to 170 lbs',
        'Help Poor with electricity',
        'Take Grandkids to Disney World'
    ]);
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
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
                            title="Gallery"
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
                    <View style={styles.tabBar}>
                        <Pressable
                            style={styles.tabButton}
                            onPress={() => {
                                console.log('Press me')
                            }}
                        >
                            <Text style={styles.tabContent}>{'Music'}</Text>
                        </Pressable>
                        <Pressable
                            style={styles.tabButton}
                            onPress={() => {
                                console.log('Press me')
                            }}
                        >
                            <Text style={styles.tabContent}>{'Video'}</Text>
                        </Pressable>
                        <Pressable
                            style={styles.tabButton}
                            onPress={() => {
                                console.log('Press me')
                            }}
                        >
                            <Text style={styles.tabContent}>{'Photo'}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.music}>
                        <PagerView style={styles.pagerView} initialPage={0}>
                            <View key="1">
                                <Text>First page</Text>
                            </View>
                            <View key="2">
                                <Text>Second page</Text>
                            </View>
                        </PagerView>
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
                                    console.log('You clicked the back button')
                                    // navigation.navigate('')
                                }}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView >
        </View >
    )
}
export default GalleryScreen;
