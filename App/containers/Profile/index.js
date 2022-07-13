import * as React from 'react';
import {
    Image,
    View,
    Text,
    Switch
  } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import AuthInput from '../../components/AuthInput';
import InlineContainer from '../../components/InlineContainer';
import LinkButton from '../../components/LinkButton';
import OutlineButton from '../../components/OutlineButton';
import IconButton from '../../components/IconButton';
import Images from '../../utils/Images';
import {styles} from './styles';
import { scale } from '../../utils/scale';
import Colors from '../../utils/Colors';
import YearPickerModal from '../../components/YearPickerModal';
import DurationModal from '../../components/DurationModal';

const ProfileScreen = ({ navigation }) => {
    const {loading, login} = React.useContext(AuthContext);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [smoke, setSmoke] = React.useState(false);
    const [yearModal, setYearModal] = React.useState(false);
    const [durationModal, setDurationModal] = React.useState(false);

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
                <View style={styles.containerInner}>
                    <Image            
                        source={Images.ic_full_logo}
                        style={styles.logo}
                        resizeMode={'contain'}
                    />
                    <View style={styles.inputForm}>
                        <InlineContainer
                            title="Enter your year of birth"
                            actionChild={
                                <IconButton
                                    icon={Images.ic_calendar}
                                    width={scale(21)}
                                    height={scale(24)}
                                    onPress={()=>{setYearModal(true)}}
                                />
                            }
                        />
                        <View style={styles.divider}/>
                        <InlineContainer
                            title="Do you smoke?"
                            actionChild={
                                <Switch
                                    trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                    thumbColor={Colors.white}
                                    ios_backgroundColor={Colors.primaryColor}
                                    onValueChange={() => {setSmoke(!smoke)}}
                                    value={smoke}
                                />
                            }
                        />                        
                        <View style={styles.divider}/>
                        <InlineContainer
                            title="Are you healthy?"
                            actionChild={
                                <Switch
                                    trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                    thumbColor={Colors.white}
                                    ios_backgroundColor={Colors.primaryColor}
                                    onValueChange={() => {setSmoke(!smoke)}}
                                    value={smoke}
                                />
                            }
                        />                        
                        <View style={styles.divider}/>
                        <InlineContainer
                            title="Relatives with heart disease?"
                            actionChild={
                                <Switch
                                    trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                    thumbColor={Colors.white}
                                    ios_backgroundColor={Colors.primaryColor}
                                    onValueChange={() => {setSmoke(!smoke)}}
                                    value={smoke}
                                />
                            }
                        />                
                        <View style={styles.divider}/>
                        <InlineContainer
                            title="Exercise Frequency?"
                            actionChild={
                                <IconButton
                                    icon={Images.ic_running}
                                    width={scale(21)}
                                    height={scale(24)}
                                    onPress={()=>{setDurationModal(true)}}
                                />
                            }
                            />
                    </View>
                    <View style={styles.loginWrapper}>
                        <OutlineButton
                            title="Click to see age you'll likely die"
                            loading={loading}
                            onPress={() => {        
                                navigation.navigate('LifeSpan');
                                // login(userName, password);
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>            
            <YearPickerModal
                visible={yearModal}
                onHide={()=>setYearModal(false)}
                onSelected={(v) => {
                    setYearModal(false)
                }}
            />
            <DurationModal
                visible={durationModal}
                onClose={()=>setDurationModal(false)}
            />
        </View>
    );
};

export default ProfileScreen;