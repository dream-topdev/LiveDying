import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
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

const FuneralScreen = ({ navigation }) => {
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
                        <ScrollView
                            style={{
                                width:'100%'
                            }}>
                            <InlineContainer
                                title="Opening Songs:"
                                fontSize={18}
                                actionChild={
                                    <TouchableOpacity
                                        style={styles.enterButton}
                                        onPress={() => {
                                            navigation.navigate('SongOpen')
                                            console.log("YOu clicked the enter button")
                                        }}
                                    >
                                        <Text style={styles.buttonContent}>{'Enter'}</Text>
                                    </TouchableOpacity>
                                }
                            />
                            <View style={styles.divider} />
                            <InlineContainer
                                title="Procession Song:"
                                fontSize={18}
                                actionChild={
                                    <TouchableOpacity
                                        style={styles.enterButton}
                                        onPress={() => {
                                            navigation.navigate('SongProcess')
                                            console.log("YOu clicked the enter button")
                                        }}
                                    >
                                        <Text style={styles.buttonContent}>{'Enter'}</Text>
                                    </TouchableOpacity>
                                }
                            />
                            <View style={styles.divider} />
                            <InlineContainer
                                title="Pall Bearers:"
                                fontSize={18}
                                actionChild={
                                    <TouchableOpacity
                                        style={styles.enterButton}
                                        onPress={() => {
                                            navigation.navigate('Pallbearer')
                                            console.log("YOu clicked the enter button")
                                        }}
                                    >
                                        <Text style={styles.buttonContent}>{'Enter'}</Text>
                                    </TouchableOpacity>
                                }
                            />
                            <View style={styles.divider} />
                            <InlineContainer
                                title="Speakers / Topics:"
                                fontSize={18}
                                actionChild={
                                    <TouchableOpacity
                                        style={styles.enterButton}
                                        onPress={() => {
                                            navigation.navigate('Speaker')
                                            console.log("YOu clicked the enter button")
                                        }}
                                    >
                                        <Text style={styles.buttonContent}>{'Enter'}</Text>
                                    </TouchableOpacity>
                                }
                            />
                            <View style={styles.divider} />
                            <InlineContainer
                                title="Life Video:"
                                fontSize={18}
                                actionChild={
                                    <TouchableOpacity
                                        style={styles.enterButton}
                                        onPress={() => {
                                            navigation.navigate('Gallery')
                                            console.log("YOu clicked the enter button")
                                        }}
                                    >
                                        <Text style={styles.buttonContent}>{'Enter'}</Text>
                                    </TouchableOpacity>
                                }
                            />
                            <View style={styles.divider} />
                            <InlineContainer
                                title="Closing Song:"
                                fontSize={18}
                                actionChild={
                                    <TouchableOpacity
                                        style={styles.enterButton}
                                        onPress={() => {
                                            navigation.navigate('SongClose')
                                            console.log("YOu clicked the enter button")
                                        }}
                                    >
                                        <Text style={styles.buttonContent}>{'Enter'}</Text>
                                    </TouchableOpacity>
                                }
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.footerInner}>
                            <IconButton
                                icon={Images.ic_back}
                                width={52}
                                height={52}
                                onPress={() => {
                                    console.log('You clicked the back button')
                                    navigation.navigate('PlanMessage')
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
                                icon={Images.ic_share}
                                width={52}
                                height={52}
                                onPress={() => {
                                    console.log('You clicked the back button')
                                }}
                            />
                            <IconButton
                                icon={Images.ic_next}
                                width={52}
                                height={52}
                                onPress={() => {
                                    console.log('You clicked the back button')
                                    navigation.navigate('SongOpen')

                                }}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default FuneralScreen;
