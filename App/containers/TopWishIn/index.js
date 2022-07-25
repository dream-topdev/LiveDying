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
import { useQuery } from 'react-query';
import API from '../../services/API';
import { scale } from '../../utils/scale';

const TopWishInScreen = ({ navigation }) => {
    const { userProfile } = useContext(AuthContext);
    const userId = userProfile.result.id;
    const { data, isLoading, status } = useQuery(["getTopWishById", userId], () => API.getTopWishById(userId));
    const [topWishList, setTopWishList] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (data != null && status == 'success') {
            let temp = [];
            data.result.forEach((item) => {
                temp.push(
                    {
                        id: item.id,
                        content: item.content
                    }
                )
            })
            setTopWishList(temp);
        }
    }, [data])
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
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.containerInner}>
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
                                            placeholder='Enter 1st topwish'
                                            value={item.content}
                                            onChangeText={(v) => {
                                                item.content = v;
                                                console.log(item.id)
                                            }}
                                            borderType={"roundTop"}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.loginWrapper}>
                        <OutlineButton
                            title="Next"
                            loading={false}
                            onPress={() => {
                                navigation.navigate('TopWishOut');
                            }}
                        />
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView >
    );
};

export default TopWishInScreen;