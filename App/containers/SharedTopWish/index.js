import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../AuthProvider';
import IconButton from '../../components/IconButton';
import { scale, scaleVertical } from '../../utils/scale';
import { styles } from './styles';
import Images from '../../utils/Images';
import { useQuery, useMutation } from 'react-query';
import API from '../../services/API';


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
