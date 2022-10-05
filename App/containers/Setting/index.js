import * as React from 'react';
import { useContext, useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    PermissionsAndroid,
    TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import Modal from "react-native-modal";
import Images from '../../utils/Images';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../AuthProvider';
import IconButton from '../../components/IconButton';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';


const SettingScreen = ({ navigation }) => {
    const { userProfile, logout } = useContext(AuthContext);
    const userid = userProfile.result.id;
    const [avatar, setAvatar] = useState(userProfile.result.avatar)
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
                                    source={{ uri: avatar }}
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
                                        <TouchableOpacity
                                            style={styles.settingItem}
                                            onPress={() => {
                                                navigation.navigate('EditProfile');
                                            }}
                                        >
                                            <Image
                                                style={styles.settingIcon}
                                                source={Images.ic_user}
                                            />
                                            <Text style={styles.settingContent}>{'Profile'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.settingItem}>
                                            <Image
                                                style={styles.settingIcon}
                                                source={Images.ic_password}
                                            />
                                            <Text style={styles.settingContent}>{'Reset password'}</Text>
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
                                            <Text style={styles.settingContent}>{'Log out'}</Text>
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
