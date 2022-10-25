import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import OutlineButton from '../../components/OutlineButton';
import AuthInput from '../../components/AuthInput';
import { styles } from './styles';
import { useMutation, useQuery } from 'react-query';
import API from '../../services/API';
import { scale } from '../../utils/scale';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const TopWishInScreen = ({ navigation }) => {
    const { userProfile } = useContext(AuthContext);
    const userId = userProfile.result.id;
    const { data, isLoading: isLoading1, status } = useQuery(["getTopWishById", userId], () => API.getTopWishById(userId));
    const [topWishList, setTopWishList] = useState([]);
    const [isNew, setIsNew] = useState(true);

    const { mutate: postTopWish, isLoading: isLoading2 } = useMutation(API.postTopWishById, {
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your top wishes are uploaded successsfully.'
            })
            navigation.navigate('TopWishOut');
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
                text2: 'Your top wish is updated successfully.'
            })
            navigation.navigate('TopWishOut');
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
            console.log('---------topwish list length is zero ')
            let temp = [
                {
                    id: 0,
                    content: ''
                },
                {
                    id: 1,
                    content: ''
                },
                {
                    id: 2,
                    content: ''
                },
                {
                    id: 3,
                    content: ''
                },
                {
                    id: 4,
                    content: ''
                }
            ]
            setTopWishList(temp);
            setIsNew(true);
        }
    }, [data])

    useEffect((() => {
        let result = topWishList.filter((v) => { return v["id"] == 55 });
        console.log('safdasdfasdfasdfasdfasd', result);
    }), [])
    const getOrderString = (number) => {
        switch (number) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return "th";
        }
    }
    if (isLoading1 || isLoading2 || isLoading3)
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
                                topWishList.map((item) => (
                                    <View key={item.id} style={styles.topwishItenWrapper}>
                                        <AuthInput
                                            placeholder={`Enter ${item.id + 1}${getOrderString(item.id + 1)} topwish`}
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
                                                    console.log(index, temp[index]);
                                                    temp[index].content = v;
                                                    setTopWishList(temp);
                                                    console.log(temp)
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
                            isNew ? postTopWish(parmas) : updateTopWish(parmas);
                            // navigation.navigate('TopWishOut');
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default TopWishInScreen;