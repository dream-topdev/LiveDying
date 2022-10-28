import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMutation, useQuery } from 'react-query';

import OutlineButton from '../../components/OutlineButton';
import AuthInput from '../../components/AuthInput';
import Loading from '../../components/Loading';

import { generateTopwishInList } from '../../utils/commonUtil';

import { AuthContext } from '../../AuthProvider';
import API from '../../services/API';
import { styles } from './styles';


const TopWishInScreen = ({ navigation }) => {
    const { userProfile } = useContext(AuthContext);
    const [topWishList, setTopWishList] = useState([]);
    const [isNew, setIsNew] = useState(true);

    const userId = userProfile.result.id;

    const { data, isLoading: isLoading1, status } = useQuery(["getTopWishById", userId], () => API.getTopWishById(userId));
    const { mutate: postTopWish, isLoading: isLoading2 } = useMutation(API.postTopWishById, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your bucket lists are uploaded successsfully.'
            })
            navigation.replace('TopWishOut');
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: err.message
            })
        }
    })

    const { mutate: updateTopWish, isLoading: isLoading3 } = useMutation(API.putUpdateTopWishById, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your bucket lists are updated successfully.'
            })
            navigation.replace('TopWishOut');
        },
        onErrro: (err) => {
            Toast.show({
                type: "error",
                text1: 'Sorry',
                text2: err.message
            })
        }
    })

    useEffect(() => {
        if (data != null && data.result.length !== 0 && status == 'success') {
            console.log('topwish list is no zero ', data);
            let temp = [];
            data.result.forEach((item) => {
                temp.push(
                    {
                        id: item.id,
                        content: item.content
                    }
                )
            })
            console.log(temp)
            setTopWishList(temp);
            setIsNew(false)
        } else {
            let temp = generateTopwishInList(5);
            setTopWishList(temp);
            setIsNew(true);
        }
    }, [data])

    if (isLoading1 || isLoading2 || isLoading3)
        return <Loading />

    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <View style={styles.message}>
                        <Text style={styles.notetext}>
                            {"With just 24 years remaining, what are you going to do with that time?"}
                        </Text>
                        <Text style={styles.plannote}>
                            {"Plan out your time left by focusing on what is most important."}
                        </Text>
                    </View>
                    <View style={styles.topwishlist}>
                        <ScrollView>
                            {
                                topWishList.map((item, index) => (
                                    <View key={item.id} style={styles.topwishItenWrapper}>
                                        <AuthInput
                                            placeholder={`Bucket List item #${index + 1}`}
                                            value={item.content}
                                            onChangeText={(v) => {
                                                if (isNew) {
                                                    let temp = [...topWishList];
                                                    temp[item.id].content = v;
                                                    setTopWishList(temp);
                                                    console.log(item.id)
                                                } else {
                                                    let temp = [...topWishList];
                                                    let index = temp.findIndex(d => d.id == item.id)
                                                    temp[index].content = v;
                                                    setTopWishList(temp);
                                                }
                                            }}
                                            borderType={"roundTop"}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.divider} />
                </KeyboardAwareScrollView >
                <View style={styles.loginWrapper}>
                    <OutlineButton
                        title="Next"
                        loading={false}
                        onPress={() => {
                            console.log('Hello world', topWishList)
                            let parmas = {
                                userId,
                                body: {
                                    contents: topWishList
                                }
                            }
                            let checkEmpty = parmas.body.contents.filter((item) => item.content == '')
                            if (checkEmpty.length > 0)
                                Toast.show({
                                    type: 'error',
                                    text1: 'Sorry',
                                    text2: 'Please enter all 5 of topwishes.'
                                })
                            else
                                isNew ? postTopWish(parmas) : updateTopWish(parmas);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default TopWishInScreen;