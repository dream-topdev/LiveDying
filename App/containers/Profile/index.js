import * as React from 'react';
import { useState, useEffect, useCallback, useContext } from 'react';
import {
    Image,
    View,
    Text,
    Switch,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useMutation, useQuery } from "react-query";
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';

import InlineContainer from '../../components/InlineContainer';
import OutlineButton from '../../components/OutlineButton';
import SelectionModal from '../../components/SelectionModal';
import IconButton from '../../components/IconButton';
import LabelInputNumber from '../../components/LabelInputNumber';

import { AuthContext } from '../../AuthProvider';
import API from '../../services/API';
import Images from '../../utils/Images';
import { scale } from '../../utils/scale';
import Colors from '../../utils/Colors';
import { styles } from './styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const re = /^[0-9\b]+$/;
const proPertyList = {
    gender: {
        title: 'Gender',
        content: [
            'Male',
            'Female'
        ]
    },
    race: {
        title: 'Race',
        content: [
            'White',
            'Black',
            'Hispanic',
            'Asian',
        ]
    },
    education: {
        title: 'Highest Level of Education',
        content: [
            'Didn\'t complete high school',
            'Graduated high school/trade school',
            'Graduated college or higher',
        ]
    },
    maritalStatus: {
        title: 'Marital Status',
        content: [
            'Single/Never Married',
            'Married/Cohabitated',
            'Widowed',
            'Divorced',
        ]
    },
    exercisePerWeek: {
        title: 'How many hours do you exercise per week?',
        content: [
            '0',
            'Less than 2.5 hours',
            'Approximately 2.5 hours',
            'More than 2.5 hours',
        ]
    },
    healthRank: {
        title: 'How would you rank your health?',
        content: [
            'I\'m in great health',
            'I\'m in ok health',
            'I\'m in poor health',
        ]
    },
    alcoholPerWeek: {
        title: 'How many alcoholic drinks do you consume per week?',
        content: [
            'None',
            'Less than 2',
            'Between 2 and 7',
            '8 or more',
        ]
    },
    kindOfSmoker: {
        title: {
            present: 'What kind of smoker are you?',
            past: 'What kind of smoker were you?'
        },
        content: [
            'Light: less than 10 cigarretes per day',
            'Average: between 10 and 20 cigarretes per day',
            'Heavy: more than 20 cigarretes per day',
        ]
    },
    ageQuitSmoking: {
        title: 'At what age did you quit smoking?',
        content: [
            'Before 25',
            '25-34',
            '35-44',
            '45-59',
            '60',
        ]
    }
}

const stringToBoolean = (str) => {
    switch (str.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(str);
    }
}

const getAgeFromBirthdday = (birthday) => {
    let birthDate = new Date(birthday);
    let now = new Date();
    let birthYear = birthDate.getFullYear();
    let thisYear = now.getFullYear();
    return thisYear - birthYear;
}
const Person = ({
    birthday,
    setBirthday,
    gender,
    setGender,
    education,
    setEducation,
    race,
    setRace,
    maritalStatus,
    setMaritalStatus,
    isSingle,
    setIsSingle,
    isMarried,
    setIsMarried,
    yearsOfMarriage,
    setYearsOfMarriage,
    isWidowed,
    setIsWidowed,
    yearsSinceSpousePassing,
    setYearsSinceSpousePassing,
    isDivorced,
    setIsDivorced,
    yearsOfDivorct,
    setIearsOfDivorce

}) => {
    const [yearModal, setYearModal] = useState(false);
    const [selectionModal, setSelectionModal] = useState(false);
    const [selectionTitle, setSelectionTitle] = useState('');
    const [itemList, setItemList] = useState([]);
    const [activeItem, setActiveItem] = useState('');

    const showPicker = useCallback((value) => setYearModal(value), []);
    const onValueChange = useCallback((event, newDate) => {
        const selectedDate = newDate || birthday;
        showPicker(false);
        setBirthday(selectedDate);
    },
        [birthday, showPicker],
    );

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView >
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
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingRight: scale(20),
                            paddingVertical: scale(5),
                            backgroundColor: Colors.textInputBackground,
                            borderRadius: scale(25)
                        }}>
                            <View style={{
                                flex: 6,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                paddingHorizontal: scale(10)
                            }}>
                                <OutlineButton
                                    title={'Male'}
                                    active={gender}
                                    onPress={() => setGender(true)}
                                    width={'45%'}
                                    height={40}
                                />
                                <OutlineButton
                                    title={'Female'}
                                    active={!gender}
                                    onPress={() => setGender(false)}
                                    width={'45%'}
                                    height={40}
                                />
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <IconButton
                                    icon={Images.ic_gender}
                                    width={scale(21)}
                                    height={scale(24)}
                                    disabled
                                />
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <InlineContainer
                            title={race}
                            actionChild={
                                <IconButton
                                    icon={Images.ic_race}
                                    width={scale(21)}
                                    height={scale(24)}
                                    marginRight={12}
                                    disabled={false}
                                    onPress={async () => {
                                        await setSelectionTitle(proPertyList.race.title);
                                        await setActiveItem(race);
                                        await setItemList(proPertyList.race.content);
                                        await setSelectionModal(true);
                                    }}
                                />
                            }
                        />
                        <View style={styles.divider} />
                        <InlineContainer
                            title={education}
                            actionChild={
                                <IconButton
                                    icon={Images.ic_education}
                                    width={scale(21)}
                                    height={scale(24)}
                                    marginRight={12}
                                    disabled={false}
                                    onPress={async () => {
                                        await setSelectionTitle(proPertyList.education.title);
                                        await setActiveItem(education);
                                        await setItemList(proPertyList.education.content);
                                        await setSelectionModal(true);
                                    }}
                                />
                            }
                        />
                        <View style={styles.divider} />
                        <InlineContainer
                            title={maritalStatus == undefined || maritalStatus == '' ? (
                                'Please select'
                            ) : (
                                maritalStatus
                            )}
                            actionChild={
                                <IconButton
                                    icon={Images.ic_married}
                                    width={scale(21)}
                                    height={scale(24)}
                                    marginRight={12}
                                    disabled={false}
                                    onPress={async () => {
                                        await setSelectionTitle(proPertyList.maritalStatus.title);
                                        await setActiveItem(maritalStatus);
                                        await setItemList(proPertyList.maritalStatus.content);
                                        await setSelectionModal(true);
                                    }}
                                />
                            }
                        />
                        <View style={styles.divider} />
                        {isWidowed && (
                            <LabelInputNumber
                                title={"Years since ex-spouse passed:"}
                                value={yearsSinceSpousePassing.toString()}
                                onChangeText={(value) => {
                                    const re = /^[0-9\b]+$/;
                                    if (value !== '' && re.test(value)) {
                                        setYearsOfMarriage(parseInt(value));
                                    }
                                }}
                            />
                        )
                        }
                        {
                            isDivorced && (
                                <LabelInputNumber
                                    title={"Years since divorce:"}
                                    value={yearsOfDivorce.toString()}
                                    onChangeText={(value) => {
                                        const re = /^[0-9\b]+$/;
                                        if (value !== '' && re.test(value)) {
                                            setYearsOfMarriage(parseInt(value));
                                        }
                                    }}
                                />
                            )
                        }
                        <View style={styles.divider} />
                        {
                            (isMarried || isDivorced || isWidowed) && (
                                <LabelInputNumber
                                    title={isMarried ? "Years since current marriage/cohabitation began:" : "Length of marriage in years:"}
                                    value={yearsOfMarriage.toString()}
                                    onChangeText={(value) => {
                                        const re = /^[0-9\b]+$/;
                                        if (value !== '' && re.test(value)) {
                                            setYearsOfMarriage(parseInt(value));
                                        }
                                    }}
                                />
                            )
                        }
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView >
            {
                yearModal &&
                <MonthPicker
                    value={new Date(birthday)}
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
            <SelectionModal
                visible={selectionModal}
                itemList={itemList}
                title={selectionTitle}
                activeItem={activeItem}
                onPress={(selectedItem, title) => {
                    let titleKey = title.split(" ").join("").trim().toLowerCase();
                    switch (titleKey) {
                        case 'race': setRace(selectedItem); break;
                        case 'highestlevelofeducation': setEducation(selectedItem); break;
                        case 'maritalstatus':
                            setMaritalStatus(selectedItem);
                            switch (selectedItem) {
                                case 'Single/Never Married':
                                    setIsSingle(true);
                                    setIsMarried(false);
                                    setIsDivorced(false);
                                    setIsWidowed(false);
                                    break;
                                case 'Married/Cohabitated':
                                    setIsSingle(false);
                                    setIsMarried(true);
                                    setIsDivorced(false);
                                    setIsWidowed(false);
                                    break;
                                case 'Widowed': setIsSingle(true);
                                    setIsSingle(false);
                                    setIsMarried(false);
                                    setIsDivorced(false);
                                    setIsWidowed(true);
                                    break;
                                case 'Divorced':
                                    setIsSingle(false);
                                    setIsMarried(false);
                                    setIsDivorced(true);
                                    setIsWidowed(false);
                                    break;
                            }
                            break;
                    }
                    setSelectionModal(false);
                }}
                onClose={() => {
                    setSelectionModal(false);
                }}
            />
        </View >
    );
};

const Health = ({
    height,
    setHeight,
    weight,
    setWeight,
    bmi,
    setBmi,
    validHeight,
    setValidHeight,
    validWeight,
    setValidWeight,
    validBMI,
    setValidBMI,
    iconType,
    setIconType,
    heightError,
    setHeightError,
    exercisePerWeek,
    setExercisePerWeek,
    healthRank,
    setHealthRank,
    checkdiabetes,
    setCheckdiabetes,
    checkmental,
    setCheckmental,
    alcoholPerWeek,
    setAlcoholPerWeek,
    checksmoking,
    setChecksmoking,
    checkStillSmoking,
    setCheckStillSmoking,
    kindOfSmoker,
    setKindOfSmoker,
    ageQuitSmoking,
    setAgeQuitSmoking,
}) => {
    const { userProfile } = React.useContext(AuthContext);
    const userId = userProfile.result.id;

    const [selectionModal, setSelectionModal] = useState(false);
    const [selectionTitle, setSelectionTitle] = useState('');
    const [itemList, setItemList] = useState([]);
    const [activeItem, setActiveItem] = useState('');

    const [iconUrl, setIconUrl] = useState(null);

    useEffect(() => {
        if (validHeight && validWeight) {
            let heightSquared = parseInt(height) * parseInt(height) / 10000;
            let bmiTemp = (parseInt(weight) / heightSquared).toPrecision(4);
            switch (true) {
                case bmiTemp < 18.5:
                    setIconUrl(Images.ic_underweight);
                    setIconType("underweight");
                    break;
                case bmiTemp >= 18.5 && bmiTemp < 25:
                    setIconUrl(Images.ic_normal);
                    setIconType("normal");
                    break;
                case bmiTemp >= 25 && bmiTemp < 30:
                    setIconUrl(Images.ic_overweight);
                    setIconType("overweight");
                    break;
                case bmiTemp > 30 && bmiTemp < 35:
                    setIconUrl(Images.ic_obese);
                    setIconType("obese");
                    break;
                default:
                    setIconUrl(Images.ic_extremely_obese);
                    setIconType("extremely-obese");
                    break;
            }
            setBmi(bmiTemp);
        } else {
            setIconUrl(null);
            setBmi(0)
        }
    }, [weight, height, validWeight, validHeight])
   
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView >
                <View style={styles.inputForm}>
                    <ScrollView>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: '70%',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <InlineContainer
                                    title={height}
                                    editable={true}
                                    placeholder={'180(cm)'}
                                    onChangeText={value => {
                                        if (value == '') {
                                            setValidHeight(false);
                                        } else if (value == '0') {
                                            setValidHeight(false)
                                        } else if (!re.test(value)) {
                                            setValidHeight(false);
                                        } else {
                                            setValidHeight(true);
                                            setHeight(value);
                                        }
                                    }}
                                    multiline={false}
                                    actionChild={
                                        <IconButton
                                            icon={Images.ic_height}
                                            width={scale(21)}
                                            height={scale(24)}
                                            marginRight={12}
                                            disabled={true}
                                        />
                                    }
                                />
                                <View style={styles.divider} />
                                <InlineContainer
                                    title={weight.toString()}
                                    editable={true}
                                    placeholder={'80(Kg)'}
                                    onChangeText={(value) => {
                                        if (value == '') {
                                            setValidWeight(false);
                                        } else if (value == '0') {
                                            setValidWeight(false)
                                        } else if (!re.test(value)) {
                                            2
                                            setValidWeight(false);
                                        } else {
                                            setValidWeight(true);
                                            setWeight(value);
                                        }
                                    }}
                                    multiline={false}
                                    actionChild={
                                        <IconButton
                                            icon={Images.ic_weight}
                                            width={scale(21)}
                                            height={scale(24)}
                                            marginRight={12}
                                            disabled={true}
                                        />
                                    }
                                />
                            </View>
                            <View style={{
                                marginRight: scale(30)
                            }}>
                                <Image
                                    source={iconUrl}
                                />
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <InlineContainer
                            title={exercisePerWeek}
                            actionChild={
                                <IconButton
                                    icon={Images.ic_exercise}
                                    width={scale(21)}
                                    height={scale(24)}
                                    marginRight={12}
                                    disabled={false}
                                    onPress={async () => {
                                        await setSelectionTitle(proPertyList.exercisePerWeek.title);
                                        await setActiveItem(exercisePerWeek);
                                        await setItemList(proPertyList.exercisePerWeek.content);
                                        await setSelectionModal(true);
                                    }}
                                />
                            }
                        />
                        <View style={styles.divider} />
                        <InlineContainer
                            title={healthRank}
                            actionChild={
                                <IconButton
                                    icon={Images.ic_health}
                                    width={scale(21)}
                                    height={scale(24)}
                                    marginRight={12}
                                    disabled={false}
                                    onPress={async () => {
                                        await setSelectionTitle(proPertyList.healthRank.title);
                                        await setActiveItem(healthRank);
                                        await setItemList(proPertyList.healthRank.content);
                                        await setSelectionModal(true);
                                    }}
                                />
                            }
                        />
                        <View style={styles.divider} />
                        <InlineContainer
                            title="Do you have diabetes?"
                            actionChild={
                                <Switch
                                    trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                    thumbColor={Colors.white}
                                    ios_backgroundColor={Colors.primaryColor}
                                    disabled={false}
                                    onValueChange={() => setCheckdiabetes(!checkdiabetes)}
                                    value={checkdiabetes}
                                />
                            }
                        />
                        <View style={styles.divider} />
                        <InlineContainer
                            title="Are you currently diagnosed with a serious mental condition?"
                            actionChild={
                                <Switch
                                    trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                    thumbColor={Colors.white}
                                    ios_backgroundColor={Colors.primaryColor}
                                    disabled={false}
                                    onValueChange={() => setCheckmental(!checkmental)}
                                    value={checkmental}
                                />
                            }
                        />
                        <View style={styles.divider} />
                        <InlineContainer
                            title={alcoholPerWeek}
                            actionChild={
                                <IconButton
                                    icon={Images.ic_alcohol}
                                    width={scale(21)}
                                    height={scale(24)}
                                    marginRight={12}
                                    disabled={false}
                                    onPress={async () => {
                                        await setSelectionTitle(proPertyList.alcoholPerWeek.title);
                                        await setActiveItem(alcoholPerWeek);
                                        await setItemList(proPertyList.alcoholPerWeek.content);
                                        await setSelectionModal(true);
                                    }}
                                />
                            }
                        />
                        <View style={styles.divider} />
                        <InlineContainer
                            title="Have you ever smoked?"
                            actionChild={
                                <Switch
                                    trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                    thumbColor={Colors.white}
                                    ios_backgroundColor={Colors.primaryColor}
                                    onValueChange={() => { setChecksmoking(!checksmoking) }}
                                    disabled={false}
                                    value={checksmoking}
                                />
                            }
                        />
                        <View style={styles.divider} />
                        {
                            checksmoking && (
                                <InlineContainer
                                    title="Do you still smoke?                            "
                                    actionChild={
                                        <Switch
                                            trackColor={{ true: Colors.primaryColor, false: Colors.textInputPlacholder }}
                                            thumbColor={Colors.white}
                                            ios_backgroundColor={Colors.primaryColor}
                                            onValueChange={() => { setCheckStillSmoking(!checkStillSmoking) }}
                                            disabled={false}
                                            value={checkStillSmoking}
                                        />
                                    }
                                />
                            )
                        }
                        <View style={styles.divider} />
                        {
                            checksmoking && (
                                <InlineContainer
                                    title={kindOfSmoker}
                                    actionChild={
                                        <IconButton
                                            icon={Images.ic_smoke}
                                            width={scale(21)}
                                            height={scale(24)}
                                            marginRight={12}
                                            disabled={false}
                                            onPress={async () => {
                                                await setSelectionTitle(checkStillSmoking ? proPertyList.kindOfSmoker.title.present : proPertyList.kindOfSmoker.past);
                                                await setActiveItem(kindOfSmoker);
                                                await setItemList(proPertyList.kindOfSmoker.content);
                                                await setSelectionModal(true);
                                            }}
                                        />
                                    }
                                />
                            )
                        }
                        <View style={styles.divider} />
                        {
                            checksmoking && !checkStillSmoking && (
                                <InlineContainer
                                    title={ageQuitSmoking}
                                    actionChild={
                                        <IconButton
                                            icon={Images.ic_no_smoke}
                                            width={scale(21)}
                                            height={scale(24)}
                                            marginRight={12}
                                            disabled={false}
                                            onPress={async () => {
                                                await setSelectionTitle(proPertyList.ageQuitSmoking.title);
                                                await setActiveItem(ageQuitSmoking);
                                                await setItemList(proPertyList.ageQuitSmoking.content);
                                                await setSelectionModal(true);
                                            }}
                                        />
                                    }
                                />
                            )
                        }
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView >
            <SelectionModal
                visible={selectionModal}
                itemList={itemList}
                title={selectionTitle}
                activeItem={activeItem}
                onPress={(selectedItem, title) => {
                    let titleKey = title.split(" ").join("").trim().toLowerCase();
                    if (titleKey.indexOf('exercise') > -1) {
                        setExercisePerWeek(selectedItem);
                    } else if (titleKey.indexOf('rank') > -1) {
                        setHealthRank(selectedItem);
                    } else if (titleKey.indexOf('alcohol') > -1) {
                        setAlcoholPerWeek(selectedItem);
                    } else if (titleKey.indexOf('smokerare') > -1) {
                        setKindOfSmoker(selectedItem);
                    } else if (titleKey.indexOf('quit') > -1) {
                        setAgeQuitSmoking(selectedItem);
                    }
                    setSelectionModal(false);
                }}
                onClose={() => {
                    setSelectionModal(false);
                }}
            />
        </View >
    );
}

const ProfileScreen = ({ navigation }) => {
    const { userProfile, fetchProfile } = useContext(AuthContext)
    const userid = userProfile.result.id;
    // tabview
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Person' },
        { key: 'second', title: 'Health' },
    ]);

    const { mutate: calculateLifeSpan, isLoading } = useMutation(API.postCalculateLifeSpan, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: data.message
            })
            navigation.navigate('LifeSpan');
            fetchProfile(userid);
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: err.message
            })
        }
    })
    // person info
    const [birthday, setBirthday] = useState('1997-05-01');
    const [gender, setGender] = useState(true);
    const [education, setEducation] = useState('Graduated high school/trade school');
    const [race, setRace] = useState('White');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [isSingle, setIsSingle] = useState(false);
    const [isMarried, setIsMarried] = useState(false);
    const [yearsOfMarriage, setYearsOfMarriage] = useState(0);
    const [isWidowed, setIsWidowed] = useState(false);
    const [yearsSinceSpousePassing, setYearsSinceSpousePassing] = useState(0);
    const [isDivorced, setIsDivorced] = useState(false);
    const [yearsOfDivorce, setIearsOfDivorce] = useState(0);
    // health info
    const [height, setHeight] = useState('180');
    const [weight, setWeight] = useState('70');
    const [bmi, setBmi] = useState(0);
    const [validHeight, setValidHeight] = useState(false);
    const [validWeight, setValidWeight] = useState(false);
    const [validBMI, setValidBMI] = useState(false);
    const [iconType, setIconType] = useState(null);
    const [heightError, setHeightError] = useState('');
    const [exercisePerWeek, setExercisePerWeek] = useState('Less than 2');
    const [healthRank, setHealthRank] = useState('I am great health');
    const [checkdiabetes, setCheckdiabetes] = useState(false);
    const [checkmental, setCheckmental] = useState(false);
    const [alcoholPerWeek, setAlcoholPerWeek] = useState('Less than 2');
    const [checksmoking, setChecksmoking] = useState(false);
    const [checkStillSmoking, setCheckStillSmoking] = useState(false);
    const [kindOfSmoker, setKindOfSmoker] = useState('Average: between 10 and 20 cigarretes per day');
    const [ageQuitSmoking, setAgeQuitSmoking] = useState('Before 25-35');

    const renderScene = SceneMap({
        first: () => {
            return <Person
                birthday={birthday}
                setBirthday={setBirthday}
                gender={gender}
                setGender={setGender}
                education={education}
                setEducation={setEducation}
                race={race}
                setRace={setRace}
                maritalStatus={maritalStatus}
                setMaritalStatus={setMaritalStatus}
                isSingle={isSingle}
                setIsSingle={setIsSingle}
                isMarried={isMarried}
                setIsMarried={setIsMarried}
                yearsOfMarriage={yearsOfMarriage}
                setYearsOfMarriage={setYearsOfMarriage}
                isWidowed={isWidowed}
                setIsWidowed={setIsWidowed}
                yearsSinceSpousePassing={yearsSinceSpousePassing}
                setYearsSinceSpousePassing={setYearsSinceSpousePassing}
                isDivorced={isDivorced}
                setIsDivorced={setIsDivorced}
                yearsOfDivorce={yearsOfDivorce}
                setIearsOfDivorce={setIearsOfDivorce}
            />
        },
        second: () => {
            return <Health
                height={height}
                setHeight={setHeight}
                weight={weight}
                setWeight={setWeight}
                bmi={bmi}
                setBmi={setBmi}
                validHeight={validHeight}
                setValidHeight={setValidHeight}
                validWeight={validWeight}
                setValidWeight={setValidWeight}
                validBMI={validBMI}
                setValidBMI={setValidBMI}
                iconType={iconType}
                setIconType={setIconType}
                heightError={heightError}
                setHeightError={setHeightError}
                exercisePerWeek={exercisePerWeek}
                setExercisePerWeek={setExercisePerWeek}
                healthRank={healthRank}
                setHealthRank={setHealthRank}
                checkdiabetes={checkdiabetes}
                setCheckdiabetes={setCheckdiabetes}
                checkmental={checkmental}
                setCheckmental={setCheckmental}
                alcoholPerWeek={alcoholPerWeek}
                setAlcoholPerWeek={setAlcoholPerWeek}
                checksmoking={checksmoking}
                setChecksmoking={setChecksmoking}
                checkStillSmoking={checkStillSmoking}
                setCheckStillSmoking={setCheckStillSmoking}
                kindOfSmoker={kindOfSmoker}
                setKindOfSmoker={setKindOfSmoker}
                ageQuitSmoking={ageQuitSmoking}
                setAgeQuitSmoking={setAgeQuitSmoking}
            />
        }
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            activeColor={Colors.black}
            inactiveColor={Colors.black}
            tabStyle={{
                fontSize: scale(21) // This is not working and  I have to fix it and I will ping yo wen IU have done it 
            }}
            indicatorStyle={{
                borderBottomWidth: scale(3),
                borderColor: Colors.primaryColor
            }}
            indicatorContainerStyle={{
                backgroundColor: Colors.white,
            }}
            style={{
                elevation: 0,
                shadowColor: Colors.white,
                shadowOpacity: 0.4,
                shadowRadius: scale(6)
            }}
        />
    );

    if (isLoading) {
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
            <View style={styles.containerInner}>
                <View style={styles.header}>
                    <Text style={styles.notetext}>{'Profile'}</Text>
                    <Image
                        source={Images.ic_logo}
                        style={styles.logo}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={styles.songList}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        renderTabBar={renderTabBar}
                        onIndexChange={setIndex}
                    />
                </View>
                <View style={styles.loginWrapper}>
                    <OutlineButton
                        title="Click to see age you'll likely die"
                        loading={false}
                        onPress={() => {
                            let params = {
                                userid,
                                body: {
                                    person: {
                                        birthday,
                                        age: getAgeFromBirthdday(birthday),
                                        gender: gender ? "male" : "female",
                                        education,
                                        race,
                                        maritalStatus,
                                        isSingle,
                                        isMarried,
                                        yearsOfMarriage: parseInt(yearsOfMarriage),
                                        isWidowed,
                                        yearsSinceSpousePassing: parseInt(yearsSinceSpousePassing),
                                        isDivorced,
                                        yearsOfDivorce: parseInt(yearsOfDivorce)
                                    },
                                    health: {
                                        height,
                                        weight: parseInt(weight),
                                        bmi: parseFloat(bmi),
                                        validHeight,
                                        validWeight,
                                        validBMI,
                                        iconType,
                                        heightError,
                                        exercisePerWeek,
                                        healthRank,
                                        checkdiabetes,
                                        checkmental,
                                        alcoholPerWeek,
                                        checksmoking,
                                        checkStillSmoking,
                                        kindOfSmoker,
                                        ageQuitSmoking
                                    }
                                }
                            };
                            calculateLifeSpan(params);
                            // navigation.navigate('LifeSpan');
                        }}
                    />
                </View>
            </View>
        </View>
    )
}
export default ProfileScreen;