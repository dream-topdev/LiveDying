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
import SelectDropdown from 'react-native-select-dropdown';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import InlineContainer from '../../components/InlineContainer';
import OutlineButton from '../../components/OutlineButton';
import SelectionModal from '../../components/SelectionModal';
import IconButton from '../../components/IconButton';
import LabelInputNumber from '../../components/LabelInputNumber';
import Loading from '../../components/Loading';

import Images from '../../utils/Images';
import { scale } from '../../utils/scale';
import Colors from '../../utils/Colors';
import { stringToBoolean } from '../../utils/commonUtil';
import { getItems } from '../../utils/commonUtil';
import { showError } from '../../utils/commonUtil';

import { AuthContext } from '../../AuthProvider';
import API from '../../services/API';
import { styles } from './styles';

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

const Person = ({
    birthyear,
    setBirthyear,
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
    yearsOfDivorce,
    setYearsOfDivorce
}) => {
    const [selectionModal, setSelectionModal] = useState(false);
    const [selectionTitle, setSelectionTitle] = useState('');
    const [itemList, setItemList] = useState([]);
    const [activeItem, setActiveItem] = useState('');
    const yearList = getItems(new Date().getFullYear() - 1900);
    const [test, setText] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.inputForm}>
                <ScrollView>
                    <View style={styles.selectionWrapper}>
                        <SelectDropdown
                            data={yearList}
                            defaultValue={birthyear}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setBirthyear(selectedItem);
                            }}
                            defaultButtonText={'Select your birth year'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            renderDropdownIcon={() => {
                                return <IconButton
                                    icon={Images.ic_calendar}
                                    width={scale(21)}
                                    height={scale(24)}
                                    marginRight={20}
                                    disabled={true}
                                />
                            }}
                            dropdownIconPosition={'right'}
                            buttonStyle={styles.dropdown2BtnStyle}
                            buttonTextStyle={styles.dropdown2BtnTxtStyle}
                            dropdownStyle={styles.dropdown2DropdownStyle}
                            rowStyle={styles.dropdown2RowStyle}
                            rowTextStyle={styles.dropdown2RowTxtStyle}
                            selectedRowStyle={styles.dropdown2SelectedRowStyle}
                        />
                    </View>
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
                        title={(race == undefined || race == '') ? proPertyList.race.title : race}
                        actionChild={
                            <IconButton
                                icon={Images.ic_race}
                                width={scale(21)}
                                height={scale(24)}
                                marginRight={12}
                                disabled={false}
                                onPress={() => {
                                    setSelectionTitle(proPertyList.race.title);
                                    setActiveItem(race);
                                    setItemList(proPertyList.race.content);
                                    setSelectionModal(true);
                                }}
                            />
                        }
                    />
                    <View style={styles.divider} />
                    <InlineContainer
                        title={education == undefined || education == '' ? proPertyList.education.title : education}
                        actionChild={
                            <IconButton
                                icon={Images.ic_education}
                                width={scale(21)}
                                height={scale(24)}
                                marginRight={12}
                                disabled={false}
                                onPress={() => {
                                    setSelectionTitle(proPertyList.education.title);
                                    setActiveItem(education);
                                    setItemList(proPertyList.education.content);
                                    setSelectionModal(true);
                                }}
                            />
                        }
                    />
                    <View style={styles.divider} />
                    <InlineContainer
                        title={maritalStatus == undefined || maritalStatus == '' ? proPertyList.maritalStatus.title : maritalStatus}
                        actionChild={
                            <IconButton
                                icon={Images.ic_married}
                                width={scale(21)}
                                height={scale(24)}
                                marginRight={12}
                                disabled={false}
                                onPress={() => {
                                    setSelectionTitle(proPertyList.maritalStatus.title);
                                    setActiveItem(maritalStatus);
                                    setItemList(proPertyList.maritalStatus.content);
                                    setSelectionModal(true);
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
                                    setYearsSinceSpousePassing(parseInt(value));
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
                                        setYearsOfDivorce(parseInt(value));
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
                                keyboardType={'number-pad'}
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
                case bmiTemp == 0: setIconUrl(null); break
                case bmiTemp < 18.5 && bmiTemp > 0:
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
            <View style={styles.inputForm}>
                <ScrollView>
                    <InlineContainer
                        title={height}
                        editable={true}
                        placeholder={'Height(cm)'}
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
                        placeholder={'Weight(Kg)'}
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
                    <View style={styles.divider} />
                    <InlineContainer
                        title={exercisePerWeek == undefined ? proPertyList.exercisePerWeek.title : exercisePerWeek}
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
                        title={healthRank == undefined ? proPertyList.healthRank.title : healthRank}
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
                        title={alcoholPerWeek == undefined ? proPertyList.alcoholPerWeek.title : alcoholPerWeek}
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
                                title="Do you still smoke?"
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
                                title={kindOfSmoker == undefined ? (proPertyList.kindOfSmoker.title.past) : kindOfSmoker}
                                actionChild={
                                    <IconButton
                                        icon={Images.ic_smoke}
                                        width={scale(21)}
                                        height={scale(24)}
                                        marginRight={12}
                                        disabled={false}
                                        onPress={() => {
                                            console.log('check still smoking', typeof checkStillSmoking);
                                            const present = proPertyList.kindOfSmoker.title.present;
                                            const past = proPertyList.kindOfSmoker.title.past;
                                            let kindOfSmokerTemp = checkStillSmoking ? present : past;
                                            console.log("=================================", kindOfSmokerTemp)
                                            setSelectionTitle(kindOfSmokerTemp);
                                            setActiveItem(kindOfSmoker);
                                            setItemList(proPertyList.kindOfSmoker.content);
                                            setSelectionModal(true);
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
                                title={ageQuitSmoking == undefined ? proPertyList.ageQuitSmoking.title : ageQuitSmoking}
                                actionChild={
                                    <IconButton
                                        icon={Images.ic_no_smoke}
                                        width={scale(21)}
                                        height={scale(24)}
                                        marginRight={12}
                                        disabled={false}
                                        onPress={() => {
                                            setSelectionTitle(proPertyList.ageQuitSmoking.title);
                                            setActiveItem(ageQuitSmoking);
                                            setItemList(proPertyList.ageQuitSmoking.content);
                                            setSelectionModal(true);
                                        }}
                                    />
                                }
                            />
                        )
                    }
                </ScrollView>
            </View>
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
                    } else if (titleKey.indexOf('kind') > -1) {
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
    const person = userProfile.result;
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
    const [birthyear, setBirthyear] = useState(person.birthyear);
    const [gender, setGender] = useState(person.gender == 'male' ? true : false);
    const [education, setEducation] = useState(person.education);
    const [race, setRace] = useState(person.race);
    const [maritalStatus, setMaritalStatus] = useState(person.marital_status);
    const [isSingle, setIsSingle] = useState(stringToBoolean(person.is_single));
    const [isMarried, setIsMarried] = useState(stringToBoolean(person.is_married));
    const [yearsOfMarriage, setYearsOfMarriage] = useState(parseInt(person.years_of_marriage));
    const [isWidowed, setIsWidowed] = useState(stringToBoolean(person.is_widowed));
    const [yearsSinceSpousePassing, setYearsSinceSpousePassing] = useState(parseInt(person.years_since_spouse_passing));
    const [isDivorced, setIsDivorced] = useState(stringToBoolean(person.is_divorced));
    const [yearsOfDivorce, setIearsOfDivorce] = useState(parseInt(person.years_of_divorce));
    // health info
    const [height, setHeight] = useState(person.height.toString());
    const [weight, setWeight] = useState(person.weight.toString());
    const [bmi, setBmi] = useState(parseInt(person.bmi));
    const [validHeight, setValidHeight] = useState(stringToBoolean(person.valid_height));
    const [validWeight, setValidWeight] = useState(stringToBoolean(person.valid_weight));
    const [validBMI, setValidBMI] = useState(stringToBoolean(person.valid_bmi));
    const [iconType, setIconType] = useState(person.icon_type);
    const [heightError, setHeightError] = useState(person.height_error);
    const [exercisePerWeek, setExercisePerWeek] = useState(person.exercise_per_week);
    const [healthRank, setHealthRank] = useState(person.health_rank);
    const [checkdiabetes, setCheckdiabetes] = useState(stringToBoolean(person.check_diabetes));
    const [checkmental, setCheckmental] = useState(stringToBoolean(person.check_mental));
    const [alcoholPerWeek, setAlcoholPerWeek] = useState(person.alcohol_per_week);
    const [checksmoking, setChecksmoking] = useState(stringToBoolean(person.check_smoking));
    const [checkStillSmoking, setCheckStillSmoking] = useState(stringToBoolean(person.check_still_smoking));
    const [kindOfSmoker, setKindOfSmoker] = useState(person.kind_of_smoker);
    const [ageQuitSmoking, setAgeQuitSmoking] = useState(person.age_quit_smoking);

    const renderScene = SceneMap({
        first: () => {
            return <Person
                birthyear={birthyear}
                setBirthyear={setBirthyear}
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

    if (isLoading)
        return <Loading />

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
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
                                            birthyear,
                                            age: parseInt(new Date().getFullYear() - parseInt(birthyear)).toString(),
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
                                if (birthyear == null) {
                                    showError('Enter your birthyear.');
                                } else if (race == null) {
                                    showError('Select your race.');
                                } else if (education == null) {
                                    showError('Select your education status');
                                } else if (maritalStatus == null) {
                                    showError('Select your marital status.');
                                } else if (height == 0 || weight == 0) {
                                    showError('Please enter valid height and weight.');
                                } else if (exercisePerWeek == null) {
                                    showError('Select you exercise frequency per weeek.')
                                } else if (healthRank == null) {
                                    showError('Select your health rank.');
                                } else if (alcoholPerWeek == null) {
                                    showError('Select your alcohol per week. ');
                                } else {
                                    if (checksmoking) {
                                        if (checkStillSmoking && kindOfSmoker == null) {
                                            showError('Please smoking status.')
                                        } else {
                                            calculateLifeSpan(params);
                                        };
                                    } else {
                                        calculateLifeSpan(params);
                                    }
                                }
                            }}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View >
    )
}
export default ProfileScreen;