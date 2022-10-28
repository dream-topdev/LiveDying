import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useQuery, useMutation } from 'react-query';

import IconButton from '../../components/IconButton';
import Loading from '../../components/Loading';

import Images from '../../utils/Images';

import { AuthContext } from '../../AuthProvider';
import API from '../../services/API';
import { styles } from './styles';


const SharedTopWishScreen = ({ navigation }) => {
    const { userProfile, friendProfile } = useContext(AuthContext);
    const userid = userProfile.result.id;
    const friendid = friendProfile.result.id;
    console.log('=  > ', userid, friendid);
    const { data, isLoading, status } = useQuery(["getTopWishById", friendid], () => API.getTopWishById(friendid));
    const [sharedTopWishList, setSharedTopWishList] = useState([]);

    useEffect(() => {
        if (data != undefined && status == 'success') {
            console.log('topwish is ', friendid, data.result);
            let temp = [];
            data.result.forEach((item) => {
                temp.push({
                    id: item.id,
                    content: item.content
                })
            });
            setSharedTopWishList(temp);
        }
    }, [data]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.containerInner}>
                    <View style={styles.header}>
                        <View style={styles.backWrapper}>
                            <IconButton
                                icon={Images.ic_chevron_left}
                                width={25}
                                height={30}
                                marginRight={10}
                                disabled={false}
                                onPress={() => {
                                    navigation.navigate("SharedUserHome")
                                }}
                            />
                            <Text style={styles.notetext}>{friendProfile.result.first_name + ' ' + friendProfile.result.last_name}</Text>
                        </View>
                        <Image
                            source={Images.ic_logo}
                            style={styles.logo}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={styles.topWishBadgeWrapper}>
                        <Text style={styles.topWishBadge}>{'Top wish'}</Text>
                    </View>
                    <ScrollView style={styles.topWish}>
                        <ScrollView style={styles.topWishBody}>
                            {sharedTopWishList.map((item) => (
                                <View style={styles.topWishItem} key={item.id}>
                                    <View style={styles.topWishIdWrapper}>
                                        <Text style={styles.topWishId}>{item.id}</Text>
                                    </View>
                                    <View style={styles.topWishContentWrapper}>
                                        <Text style={styles.topWishContent}>{item.content}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
export default SharedTopWishScreen;
