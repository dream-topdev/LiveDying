import React, { useState, useEffect, useContext } from 'react';
import { Image, Text } from 'react-native';
import Images from '../utils/Images';
import Colors from '../utils/Colors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../AuthProvider';
import SplashScreen from '../containers/Splash';
import SignInScreen from '../containers/SignIn';
import SignUpScreen from '../containers/SignUp';
import ProfileScreen from '../containers/Profile';
import LifeSpanScreen from '../containers/LifeSpan';
import TopWishInScreen from '../containers/TopWishIn';
import TopWishOutScreen from '../containers/TopWishOut';
import PlanMessageScreen from '../containers/PlanMessage';
import FuneralScreen from '../containers/Funeral';
import SongOpenScreen from '../containers/SongOpen'
import SongProcessScreen from '../containers/SongProcess';
import SongCloseScreen from '../containers/SongClose';
import PallbearerScreen from '../containers/Pallbearer';
import SpeakerScreen from '../containers/Speaker';
import GalleryScreen from '../containers/Gallery';
import YoutubeVideoSelectScreen from '../containers/YoutubeVideoSelect';
import ShareHomeScreen from '../containers/ShareHome';
import ShareSelfScreen from '../containers/ShareSelf';
import SeeOtherScreen from '../containers/SeeOther';
import SharedUserHomeScreen from '../containers/SharedUserHome';
import SharedTopWishScreen from '../containers/SharedTopWish';
import SharedFuneralSongScreen from '../containers/SharedFuneralSong';
import SharedSpeakerScreen from '../containers/SharedSpeaker';
import SharedLifeVideoScreen from '../containers/SharedLifeVideo';
import SettingScreen from '../containers/Setting';
import PaymentScreen from '../containers/Payment';
import EditProfileScreen from '../containers/EditProfile';
import { styles } from './styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LifeSpanStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Profile"}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="LifeSpan" component={LifeSpanScreen} />
            <Stack.Screen name="TopWishIn" component={TopWishInScreen} />
            <Stack.Screen name="TopWishOut" component={TopWishOutScreen} />
            <Stack.Screen name="PlanMessage" component={PlanMessageScreen} />
        </Stack.Navigator>
    );
}

const FuneralStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Funeral'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Funeral" component={FuneralScreen} />
            <Stack.Screen name="SongOpen" component={SongOpenScreen} />
            <Stack.Screen name="SongProcess" component={SongProcessScreen} />
            <Stack.Screen name="SongClose" component={SongCloseScreen} />
            <Stack.Screen name="Pallbearer" component={PallbearerScreen} />
            <Stack.Screen name="Speaker" component={SpeakerScreen} />
            <Stack.Screen name="Gallery" component={GalleryScreen} />
            <Stack.Screen name="YoutubeVideoSelect" component={YoutubeVideoSelectScreen} />
        </Stack.Navigator>
    );
}

const ShareStack = () => {
    const { userProfile } = useContext(AuthContext);
    const isPurchased = userProfile.result.is_purchased;
    return (
        <Stack.Navigator
            initialRouteName={'ShareHome'}
            screenOptions={{ headerShown: false }}
        >
            {
                !parseInt(isPurchased) ? (
                    <>
                        <Stack.Screen name="Payment" component={PaymentScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="ShareHome" component={ShareHomeScreen} />
                        <Stack.Screen name="ShareSelf" component={ShareSelfScreen} />
                        <Stack.Screen name="SeeOther" component={SeeOtherScreen} />
                        <Stack.Screen name="SharedTopWish" component={SharedTopWishScreen} />
                        <Stack.Screen name="SharedFuneralSong" component={SharedFuneralSongScreen} />
                        <Stack.Screen name="SharedUserHome" component={SharedUserHomeScreen} />
                        <Stack.Screen name="SharedSpeaker" component={SharedSpeakerScreen} />
                        <Stack.Screen name="SharedLifeVideo" component={SharedLifeVideoScreen} />
                    </>
                )
            }
        </Stack.Navigator>
    )
}

const SettingStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Setting'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

const MainNavigator = () => {
    const { user, userProfile } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    if (isLoading) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            {
                userProfile ? (
                    <>
                        <Tab.Navigator
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Tab.Screen
                                name="LifeSpanStack"
                                component={LifeSpanStack}
                                options={{
                                    tabBarLabel: ({ focused, color, size }) => (
                                        <Text style={{ color: focused ? Colors.primaryColor : color }}>{'Lifespan'}</Text>
                                    ),
                                    tabBarIcon: ({ focused }) => (
                                        <Image source={focused ? Images.ic_lifespan_active : Images.ic_lifespan_disable} />
                                    )
                                }}
                            />
                            <Tab.Screen
                                name="FuneralStack"
                                component={FuneralStack}
                                options={{
                                    tabBarLabel: ({ focused, color, size }) => (
                                        <Text style={{ color: focused ? Colors.primaryColor : color }}>{'Funeral'}</Text>
                                    ),
                                    tabBarIcon: ({ focused }) => (
                                        <Image source={focused ? Images.ic_funeral_active : Images.ic_funeral_disable} />
                                    )
                                }}
                            />
                            <Tab.Screen
                                name="ShareStack"
                                component={ShareStack}
                                options={{
                                    tabBarLabel: ({ focused, color, size }) => (
                                        <Text style={{ color: focused ? Colors.primaryColor : color }}>{'Share'}</Text>
                                    ),
                                    tabBarIcon: ({ focused }) => (
                                        <Image source={focused ? Images.ic_share_active : Images.ic_share_disable} />
                                    )
                                }}
                            />
                            <Tab.Screen
                                name="SettingStack"
                                component={SettingStack}
                                options={{
                                    tabBarLabel: ({ focused, color, size }) => (
                                        <Text style={{ color: focused ? Colors.primaryColor : color }}>{'Setting'}</Text>
                                    ),
                                    tabBarIcon: ({ focused }) => (
                                        <Image source={focused ? Images.ic_account_active : Images.ic_account_disable} />
                                    )
                                }}
                            />
                        </Tab.Navigator>
                    </>
                ) : (
                    <>
                        <Stack.Navigator
                            initialRouteName={'SignIn'}
                            screenOptions={{ headerShown: false }}
                        >
                            <Stack.Screen name="SignIn" component={SignInScreen} />
                            <Stack.Screen name="SignUp" component={SignUpScreen} />
                        </Stack.Navigator>
                    </>
                )
            }

        </NavigationContainer>
    );
};

export default MainNavigator;