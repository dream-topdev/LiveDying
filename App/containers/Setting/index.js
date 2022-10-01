import * as React from 'react';
import { useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import Images from '../../utils/Images';
import { AuthContext } from '../../AuthProvider';

const SettingScreen = ({ }) => {
    const { userProfile, logout } = useContext(AuthContext);
    const userid = userProfile.result.id;
    console.log(userid);
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <View style={styles.header}>
                        <Text style={styles.notetext}>{'Setting'}</Text>
                        <Image
                            source={Images.ic_logo}
                            style={styles.logo}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.messageWrapper}>
                        <View style={styles.userInfo}>
                            <View style={styles.avatarWrapper}>
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: 'https://api.lorem.space/image/face?w=450&amp;amp;amp;amp;h=660' }}
                                    resizeMode={'contain'}
                                />
                            </View>
                            <View style={styles.userInfoRight}>
                                <View style={styles.userNameWrapper}>
                                    <Text style={styles.userName}>
                                        {
                                            userProfile.result.first_name + " " + userProfile.result.last_name
                                        }
                                    </Text>
                                </View>
                                <View style={styles.userEmailWrapper}>
                                    <Text style={styles.userEmail}>{userProfile.result.email}</Text>
                                </View>
                                <View style={styles.horizontal} />
                                <View style={styles.settingWrapper}>
                                    <View style={styles.setting}>
                                        <TouchableOpacity style={styles.settingItem}>
                                            <Image
                                                style={styles.settingIcon}
                                                source={Images.ic_user}
                                            />
                                            <Text>{'Profile'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.settingItem}>
                                            <Image
                                                style={styles.settingIcon}
                                                source={Images.ic_password}
                                            />
                                            <Text>{'Reset password'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.settingItem}
                                            onPress={() => {
                                                logout();
                                            }}
                                        >
                                            <Image
                                                style={styles.settingIcon}
                                                source={Images.ic_logout}
                                            />
                                            <Text>{'Log out'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SettingScreen;
