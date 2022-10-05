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

const includeExtra = true;
const actions = [
    {
        title: 'Take Image',
        type: 'capture',
        options: {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra,
        },
    },
    {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra,
        },
    },
    {
        title: 'Take Video',
        type: 'capture',
        options: {
            saveToPhotos: true,
            mediaType: 'video',
            includeExtra,
        },
    },
    {
        title: 'Select Video',
        type: 'library',
        options: {
            selectionLimit: 0,
            mediaType: 'video',
            includeExtra,
        },
    },
    {
        title: `Select Image or Video\n(mixed)`,
        type: 'library',
        options: {
            selectionLimit: 0,
            mediaType: 'mixed',
            includeExtra,
        },
    },
];
const validateEmail = (email) => {
    let isEmail = false;
    if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        isEmail = true;
    }
    return isEmail;
}
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
const defaultAvatarUrl = 'http://livelikeyouaredying.com/assets/images/default/default_avatar.png';
const SignUpScreen = ({ navigation }) => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();

    const { signup, loading } = useContext(AuthContext);
    const [avatar, setAvatar] = useState(defaultAvatarUrl);
    const [response, setResponse] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');
    useEffect(() => {
        if (firstName == null || firstName == '') {
            setError('You must enter first name');
        } else if (lastName == null || lastName == '') {
            setError('You must enter last name');
        } else if (email == '' || !validateEmail(email)) {
            setError('You must enter valid email');
        } else if (password == null || password == '') {
            setError('You must enter password');
        } else if (password != confirmPassword) {
            setError('Password is not match with confirm password');
        } else {
            setError('');
        }
    }, [firstName, lastName, email, password, confirmPassword])
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
                    <Text style={styles.notetext}>{'Sigin up'}</Text>
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
                            resizeMode={'contain'}
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
                                // handleDocumentSelection();
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
                                onSubmitEditing={() => emailRef.current.focus()}
                                borderType={"roundTop"}
                            />
                            <View style={styles.divider} />
                            <AuthInput
                                ref={emailRef}
                                placeholder='Email'
                                icon={Images.ic_email}
                                value={email}
                                onChangeText={(v) => setEmail(v)}
                                onSubmitEditing={() => passRef.current.focus()}
                                borderType={"roundBottom"}
                            />
                            <View style={styles.divider} />
                            <AuthInput
                                ref={passRef}
                                placeholder='Password'
                                icon={Images.ic_password}
                                value={password}
                                onChangeText={(v) => setPassword(v)}
                                onSubmitEditing={() => confirmPassRef.current.focus()}
                                borderType={"roundBottom"}
                                secureTextEntry={true}
                            />
                            <View style={styles.divider} />
                            <AuthInput
                                ref={confirmPassRef}
                                placeholder='Confirm Password'
                                icon={Images.ic_password}
                                value={confirmPassword}
                                onChangeText={(v) => setConfirmPassword(v)}
                                borderType={"roundBottom"}
                                secureTextEntry={true}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.loginWrapper}>
                            <OutlineButton
                                title="Sign Up"
                                loading={loading}
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
                                        formData.append('email', email);
                                        formData.append('password', password);
                                        let params = {
                                            body: formData
                                        };
                                        signup(params);
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
                        <View style={styles.noteWrapper}>
                            <Text style={styles.noteText}>{'Have an account?'} </Text>
                            <LinkButton
                                title="Log in here."
                                onPress={() => {
                                    navigation.navigate("SignIn");
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

export default SignUpScreen;