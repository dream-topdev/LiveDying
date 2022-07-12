import * as React from 'react';
import { useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import OutlineButton from '../../components/OutlineButton';
import InlineContainer from '../../components/InlineContainer';
import ActionButton from '../../components/ActionButton';
import IconButton from '../../components/IconButton';
import SongItemContainer from '../../components/SongItemContainer';
import { scale, scaleVertical } from '../../utils/scale';
import AuthInput from '../../components/AuthInput';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';

const SongCloseScreen = ({ navigation }) => {
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
                            title="CLosing Songs:"
                            fontSize={scale(18)}
                            borderRadius={scale(0)}
                            actionChild={
                                <View style={styles.youtube}>
                                    <Text style={styles.textYoutube}>{'Find On'}</Text>
                                    <IconButton
                                        icon={Images.ic_youtube}
                                        width={scale(32)}
                                        height={scale(22)}
                                        onPress={() => {
                                            console.log('You clicked the  youtube button');
                                        }}
                                    />
                                </View>
                            }
                        />
                    </View>
                    <View style={styles.songList}>
                        <ScrollView >
                            <SongItemContainer
                                thumbnail={''}
                                songTitle={'My Way'}
                                songArtist={'Frank Sinatra'}
                                songTime={'4:54'}
                            />
                            <View style={styles.divider} />
                            <SongItemContainer
                                thumbnail={''}
                                songTitle={'My Way'}
                                songArtist={'Frank Sinatra'}
                                songTime={'4:54'}
                            />
                            <View style={styles.divider} />
                            <SongItemContainer
                                thumbnail={''}
                                songTitle={'My Way'}
                                songArtist={'Frank Sinatra'}
                                songTime={'4:54'}
                            />
                            <View style={styles.divider} />
                            <SongItemContainer
                                thumbnail={''}
                                songTitle={'My Way'}
                                songArtist={'Frank Sinatra'}
                                songTime={'4:54'}
                            />
                            <View style={styles.divider} />
                            <SongItemContainer
                                thumbnail={''}
                                songTitle={'My Way'}
                                songArtist={'Frank Sinatra'}
                                songTime={'4:54'}
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
                                    navigation.navigate('SongProcess')
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
                                    navigation.navigate('Pallbearer')
                                }}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SongCloseScreen;
