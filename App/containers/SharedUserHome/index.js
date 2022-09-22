import * as React from 'react';
import { useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import IconButton from '../../components/IconButton';
import { scale, scaleVertical } from '../../utils/scale';
import { styles } from './styles';
import Images from '../../utils/Images';
import Colors from '../../utils/Colors';


const SharedUserHome = ({ route, navigation }) => {
    const { userProfile, friendProfile, loading } = useContext(AuthContext);

    if (loading) {
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
                                    navigation.navigate("SeeOther")
                                }}
                            />
                            <Text style={styles.notetext}>
                                {
                                    friendProfile.result.first_name +
                                    ' ' +
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
                    <View style={styles.userInfo}>
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
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                        // marginTop: scale(80)
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            marginBottom: scale(30)
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: '50%',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('SharedTopWish');
                                }}
                            >
                                <View >
                                    <Image source={Images.ic_top_wish} />
                                </View>
                                <Text style={{
                                    color: Colors.primaryColor
                                }}>{'Top Wish'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: '50%',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('SharedFuneralSong');
                                }}
                            >
                                <View >
                                    <Image source={Images.ic_funeral_song} />
                                </View>
                                <Text style={{
                                    color: Colors.primaryColor
                                }}>{'Funeral Song'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: scale(30)

                        }}>
                            <TouchableOpacity
                                style={{
                                    width: '50%',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('SharedSpeaker')
                                }}
                            >
                                <View >
                                    <Image source={Images.ic_pallbearer} />
                                </View>
                                <Text style={{
                                    color: Colors.primaryColor
                                }}>{'Funeral People'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: '50%',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate('SharedLifeVideo');
                                }}
                            >
                                <View >
                                    <Image source={Images.ic_lifevideo} />
                                </View>
                                <Text style={{
                                    color: Colors.primaryColor
                                }}>{'Life Video'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SharedUserHome;
