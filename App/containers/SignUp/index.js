import * as React from 'react';
import {
    SafeAreaView,
    Image,
    View,
    Text,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthInput from '../../components/AuthInput';
import LinkButton from '../../components/LinkButton';
import OutlineButton from '../../components/OutlineButton';
import Images from '../../utils/Images';
import { styles } from './styles';

const SignUpScreen = ({ navigation }) => {
    const [firstName, setFirstName] = React.useState("test_first_name");
    const [email, setEmail] = React.useState("test@test.com");
    const [lastName, setLastName] = React.useState("test_last_name");
    const [password, setPassword] = React.useState("qweasdzxc");
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <Image
                        source={Images.ic_full_logo}
                        style={styles.logo}
                        resizeMode={'contain'}
                    />
                    <View style={styles.inputForm}>
                        <ScrollView>
                            <AuthInput
                                placeholder='First Name'
                                icon={Images.ic_user}
                                value={firstName}
                                onChangeText={(v) => setFirstName(v)}
                                borderType={"roundTop"}
                            />
                            <View style={styles.divider} />
                            <AuthInput
                                placeholder='Last Name'
                                icon={Images.ic_user}
                                value={lastName}
                                onChangeText={(v) => setLastName(v)}
                                borderType={"roundTop"}
                            />
                            <View style={styles.divider} />
                            <AuthInput
                                placeholder='Email'
                                icon={Images.ic_email}
                                value={email}
                                onChangeText={(v) => setPassword(v)}
                                borderType={"roundBottom"}
                            />
                            <View style={styles.divider} />
                            <AuthInput
                                placeholder='Password'
                                icon={Images.ic_password}
                                value={password}
                                onChangeText={(v) => setPassword(v)}
                                borderType={"roundBottom"}
                                secureTextEntry={true}
                            />
                            <View style={styles.divider} />
                            <AuthInput
                                placeholder='Confirm Password'
                                icon={Images.ic_password}
                                value={password}
                                onChangeText={(v) => setPassword(v)}
                                borderType={"roundBottom"}
                                secureTextEntry={true}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.loginWrapper}>
                            <OutlineButton
                                title="Sign Up"
                                onPress={() => { }}
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
            </KeyboardAwareScrollView >
        </View >
    );
};

export default SignUpScreen;