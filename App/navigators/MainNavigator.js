import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../containers/Splash';
import SignInScreen from '../containers/SignIn';
import HomeNavigator from './HomeNavigator';
import ChatScreen from '../containers/Chat';
import SignUpScreen from '../containers/SignUp';
import { AuthContext } from '../AuthProvider';
import ProfileScreen from '../containers/Profile';
import LifeSpanScreen from '../containers/LifeSpan';
import TopWishInScreen from '../containers/TopWishIn';
import TopWishOutScreen from '../containers/TopWishOut';
import PlanMessageScreen from '../containers/PlanMessage';
import FuneralScreen from '../containers/Funeral';
import SongOpenScreen from '../containers/SongOpen'
import SongProcessScreen from '../containers/SongProcess'
import SongCloseScreen from '../containers/SongClose'

const Stack = createNativeStackNavigator();

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
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    userProfile ? (
                        <>
                            <Stack.Screen name="Home" component={HomeNavigator} />
                            <Stack.Screen name="Chat" component={ChatScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="SignIn" component={SignInScreen} />
                            <Stack.Screen name="SignUp" component={SignUpScreen} />
                            <Stack.Screen name="Profile" component={ProfileScreen} />
                            <Stack.Screen name="LifeSpan" component={LifeSpanScreen} />
                            <Stack.Screen name="TopWishIn" component={TopWishInScreen} />
                            <Stack.Screen name="TopWishOut" component={TopWishOutScreen} />
                            <Stack.Screen name="PlanMessage" component={PlanMessageScreen} />
                            <Stack.Screen name="Funeral" component={FuneralScreen} />
                            <Stack.Screen name="SongOpen" component={SongOpenScreen} />
                            <Stack.Screen name="SongProcess" component={SongProcessScreen} />
                            <Stack.Screen name="SongClose" component={SongCloseScreen} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;