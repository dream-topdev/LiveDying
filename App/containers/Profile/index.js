import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
    Image,
    View,
    Text,
    Switch,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import InlineContainer from '../../components/InlineContainer';
import OutlineButton from '../../components/OutlineButton';
import IconButton from '../../components/IconButton';
import Images from '../../utils/Images';
import { styles } from './styles';
import { scale } from '../../utils/scale';
import Colors from '../../utils/Colors';
import DurationModal from '../../components/DurationModal';
import { useQuery } from "react-query";
import API from '../../services/API';
import moment from 'moment';


const stringToBoolean = (str) => {
    switch (str.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(str);
    }
}

const ProfileScreen = ({ navigation }) => {
    const { userProfile } = React.useContext(AuthContext);
    console.log('usecontext progiel is ', userProfile);
    const userId = userProfile.result.id;
    const { data, isLoading, status } = useQuery(["getProfileById", userId], () => API.getProfileById(userId));
    const [birthday, setBirthday] = useState(new Date());
    const [smoke, setSmoke] = useState(false);
    const [isHealthy, setIsHealthy] = useState(false);
    const [haveHeartDisease, setHaveHeartDisease] = useState(false);
    const [exFreq, setExFreq] = useState('');
    const [yearModal, setYearModal] = useState(false);
    const [durationModal, setDurationModal] = useState(false);
    useEffect(() => {
        console.log(data);
        if (data != null && status == 'success') {
            console.log('profile api calling', data)
            setBirthday(new Date(data.birthday));
            setSmoke(stringToBoolean(data.is_smoke))
            setIsHealthy(stringToBoolean(data.is_healthy))
            setHaveHeartDisease(stringToBoolean(data.have_heart_disease))
            setExFreq(data.ex_freq);
        }
    }, [data])

    const showPicker = useCallback((value) => setYearModal(value), []);
    const onValueChange = useCallback((event, newDate) => {
        const selectedDate = newDate || birthday;
        showPicker(false);
        setBirthday(selectedDate);
    },
        [birthday, showPicker],
    );

    if (isLoading)
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
                            <InlineContainer
                                title={birthday == undefined || birthday == ''
                                    ? 'Enter your birth date'
                                    : (moment(birthday).format('MMMM') + ', ' + new Date(birthday).getFullYear().toString())
                                }
                                actionChild={
                                    <IconButton
                                        icon={Images.ic_calendar}
                                        width={scale(21)}
                                        height={scale(24)}
                                        marginRight={12}
                                        disabled={false}
                                        onPress={() => { setYearModal(true) }}
                                    />
                                }
                            />
                            <View style={styles.divider} />
                            <InlineContainer
                                title="Do you smoke?"
                                actionChild={
                                    <Switch
                                        trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                        thumbColor={Colors.white}
                                        ios_backgroundColor={Colors.primaryColor}
                                        disabled={false}
                                        onValueChange={() => {
                                            setSmoke(!smoke)
                                        }}
                                        value={smoke}
                                    />
                                }
                            />
                            <View style={styles.divider} />
                            <InlineContainer
                                title="Are you healthy?"
                                actionChild={
                                    <Switch
                                        trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                        thumbColor={Colors.white}
                                        ios_backgroundColor={Colors.primaryColor}
                                        disabled={false}
                                        onValueChange={() => { setIsHealthy(!isHealthy) }}
                                        value={isHealthy}
                                    />
                                }
                            />
                            <View style={styles.divider} />
                            <InlineContainer
                                title="Relatives with heart disease?"
                                actionChild={
                                    <Switch
                                        trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                        thumbColor={Colors.white}
                                        ios_backgroundColor={Colors.primaryColor}
                                        onValueChange={() => { setHaveHeartDisease(!haveHeartDisease) }}
                                        disabled={false}
                                        value={haveHeartDisease}
                                    />
                                }
                            />
                            <View style={styles.divider} />
                            <InlineContainer
                                title={exFreq === '-'
                                    ? "Exercise Frequency?"
                                    : exFreq
                                }
                                actionChild={
                                    <IconButton
                                        icon={Images.ic_running}
                                        width={scale(21)}
                                        height={scale(24)}
                                        marginRight={12}
                                        disabled={false}
                                        onPress={() => { setDurationModal(true) }}
                                    />
                                }
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.loginWrapper}>
                        <OutlineButton
                            title="Click to see age you'll likely die"
                            loading={isLoading}
                            onPress={() => {
                                navigation.navigate('LifeSpan');
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {
                yearModal &&
                <MonthPicker
                    value={birthday}
                    minimumDate={new Date(1900, 1)}
                    maximumDate={new Date()}
                    okButton={'ok'}
                    cancelButton={'cancel'}
                    onChange={onValueChange}
                    mode={'shortNumber'}
                    autoTheme={false}
                    locale="us"
                />
            }
            <DurationModal
                visible={durationModal}
                activeItem={exFreq}
                onPress={() => {
                    setDurationModal(false);
                    console.log('you clicked the next button.')
                }}
                onClose={() => {
                    setDurationModal(false);
                }}
            />
        </View>
    );
};

export default ProfileScreen;