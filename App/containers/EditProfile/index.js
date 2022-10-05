import React, { useState, useContext, useCallback, useRef, useEffect } from 'react';
import {
    Image,
    View,
    Text,
    ScrollView,
    PermissionsAndroid,
    TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import AuthInput from '../../components/AuthInput';
import LinkButton from '../../components/LinkButton';
import OutlineButton from '../../components/OutlineButton';
import Images from '../../utils/Images';
import IconButton from '../../components/IconButton';
import Modal from "react-native-modal";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import { scale } from '../../utils/scale';
import { useMutation } from 'react-query';
import API from '../../services/API';

const includeExtra = true;
const SelectionModal = ({ visible, onClose, onClickCamera, onClickGallery }) => {
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => {
                onClose();
            }}
            onBackButtonPress={() => {
                onClose();
            }}
        >
            <View style={styles.modalStyle}>
                <TouchableOpacity
                    style={styles.playCircle}
                    onPress={onClose}
                >
                    <Icon
                        name="close"
                        size={20}
                        style={styles.playyIcon}
                    />
                </TouchableOpacity>
                <View style={styles.modalBody}>
                    <View style={styles.iconWrapper}>
                        <IconButton
                            icon={Images.ic_camera}
                            width={64}
                            height={44}
                            onPress={onClickCamera}
                        />
                        <Text style={styles.iconContent}>{"Camera"}</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                        <IconButton
                            icon={Images.ic_gallery}
                            width={64}
                            height={44}
                            onPress={onClickGallery}
                        />
                        <Text style={styles.iconContent}>{"Library"}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const EditProfileScreen = ({ navigation }) => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    const { userProfile, fetchProfile } = useContext(AuthContext);
    const [avatar, setAvatar] = useState(userProfile.result.avatar);
    const [response, setResponse] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [firstName, setFirstName] = useState(userProfile.result.first_name);
    const [lastName, setLastName] = useState(userProfile.result.last_name);
    const [error, setError] = useState('');
    const { mutate: updateProfile, isLoading } = useMutation(API.updateProfile, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: data.message
            });
            fetchProfile(userProfile.result.id);
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: "Sorry",
                text2: err.message
            })
        }
    })
    useEffect(() => {
        if (firstName == null || firstName == '') {
            setError('You must enter first name');
        } else if (lastName == null || lastName == '') {
            setError('You must enter last name');
        } else {
            setError('');
        }
    }, [firstName, lastName])
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const onButtonPress = useCallback((type, options) => {
        if (type === 'capture') {
            requestCameraPermission()
            launchCamera(options, (resp) => {
                console.log(resp);
                if (resp.assets !== null && resp.assets != undefined) {
                    setResponse(resp.assets[0]);
                    setAvatar(resp.assets[0].uri);
                }
            });
        } else {
            launchImageLibrary(options, (resp) => {
                console.log(resp);
                if (resp.assets !== null && resp.assets != undefined) {
                    setResponse(resp.assets[0])
                    setAvatar(resp.assets[0].uri);
                }
            });
        }
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backWrapper}>
                    <IconButton
                        icon={Images.ic_chevron_left}
                        width={25}
                        height={30}
                        marginRight={10}
                        disabled={false}
                        onPress={() => {
                            navigation.replace('Setting')
                        }}
                    />
                    <Text style={styles.notetext}>{'Your Profile'}</Text>
                </View>
                <Image
                    source={Images.ic_logo}
                    style={styles.logo}
                    resizeMode={'contain'}
                />
            </View>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{ uri: avatar }}
                            style={styles.avatar}
                            resizeMode={'stretch'}
                        />
                    </View>
                    <View style={styles.editAvatarWrapper}>
                        <IconButton
                            icon={Images.ic_edit}
                            width={25}
                            height={25}
                            onPress={() => {
                                console.log('you clicked the edit button ');
                                setIsVisibleModal(true);
                            }}
                        />
                    </View>
                    <View style={styles.inputForm}>
                        <ScrollView>
                            <AuthInput
                                ref={firstNameRef}
                                placeholder='First Name'
                                icon={Images.ic_user}
                                value={firstName}
                                onChangeText={(v) => setFirstName(v)}
                                onSubmitEditing={() => lastNameRef.current.focus()}
                                borderType={"roundTop"}
                            />
                            <View style={styles.divider} />
                            <AuthInput
                                ref={lastNameRef}
                                placeholder='Last Name'
                                icon={Images.ic_user}
                                value={lastName}
                                onChangeText={(v) => setLastName(v)}
                                borderType={"roundTop"}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.loginWrapper}>
                            <OutlineButton
                                title="Apply"
                                loading={isLoading}
                                onPress={() => {
                                    if (error == '') {
                                        const formData = new FormData();
                                        if (response != null) {
                                            formData.append('avatar', {
                                                name: response.fileName,
                                                type: response.type,
                                                uri:
                                                    Platform.OS === 'android' ? response.uri : response.uri.replace('file://', '')
                                            })
                                        };
                                        formData.append('first_name', firstName);
                                        formData.append('last_name', lastName);
                                        formData.append('userid', userProfile.result.id);
                                        let params = {
                                            body: formData
                                        };
                                        updateProfile(params);
                                        console.log("you clicked the signup button")
                                    } else {
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Sorry',
                                            text2: error
                                        })
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
                <SelectionModal
                    visible={isVisibleModal}
                    onClose={() => {
                        setIsVisibleModal(false)
                    }}
                    onClickCamera={() => {
                        setIsVisibleModal(false);
                        setTimeout(() => {
                            onButtonPress('capture', {
                                saveToPhotos: true,
                                mediaType: 'photo',
                                includeBase64: false,
                                includeExtra,
                            });
                        }, 800);
                    }}
                    onClickGallery={() => {
                        setIsVisibleModal(false)
                        setTimeout(() => {
                            onButtonPress('library', {
                                selectionLimit: 0,
                                mediaType: 'photo',
                                includeBase64: false,
                                includeExtra,
                            });
                        }, 800);
                    }}
                />
            </KeyboardAwareScrollView >
        </View >
    );
};

export default EditProfileScreen;