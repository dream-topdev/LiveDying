import * as React from 'react';
import {
    Image,
    View,
    Text
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import AuthInput from '../../components/AuthInput';
import LinkButton from '../../components/LinkButton';
import OutlineButton from '../../components/OutlineButton';
import Images from '../../utils/Images';
import { styles } from './styles';

const SignInScreen = ({ navigation }) => {
    const { loading, login } = React.useContext(AuthContext);
    // const [userName, setUserName] = React.useState('anton@gmail.com');
    const [userName, setUserName] = React.useState('tyrannosaurus.rex@gmail.com');
    const [password, setPassword] = React.useState('qweasdzxc');
    // tyrannosaurus.rex@gmail.com
    // qweasdzxc
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1, }}>
                <View style={styles.containerInner}>
                    <Image
                        source={Images.ic_full_logo}
                        style={styles.logo}
                        resizeMode={'contain'}
                    />
                    <View style={styles.inputForm}>
                        <AuthInput
                            placeholder='Email'
                            icon={Images.ic_email}
                            value={userName}
                            onChangeText={(v) => setUserName(v)}
                            borderType={"roundTop"}
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
                    </View>
                    <View style={styles.forgetWrapper}>
                        <LinkButton
                            title="Forgot password?"
                            underline={false}
                            onPress={() => {
                                // navigation.navigate("Profile");
                            }}
                        />
                    </View>
                    <View style={styles.loginWrapper}>
                        <OutlineButton
                            title="Login"
                            loading={loading}
                            onPress={() => {
                                console.log(userName, password)
                                login(userName, password);
                            }}
                        />
                    </View>
                    <View style={styles.noteWrapper}>
                        <Text style={styles.noteText}>{'Not a member?'} </Text>
                        <LinkButton
                            title="Sign up here."
                            onPress={() => {
                                navigation.navigate("SignUp");
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default SignInScreen;