import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConsumerProfileScreen from '../containers/Consumer/Profile';
import ConsumerMailScreen from '../containers/Consumer/Mail';
import ConsumerWatchScreen from '../containers/Consumer/Watch';
import DentistMailScreen from '../containers/Dentist/Mail';
import DentistProfileScreen from '../containers/Dentist/Profile';
import ChannelScreen from '../containers/Channel';
import Images from '../utils/Images';
import { AuthContext } from '../AuthProvider';
import { styles } from './styles';


const Tab = createBottomTabNavigator();

const consumerTabs = [
    {
        name: "Mail",
        icon: "ic_mail",
        disabled: true,
        component: ConsumerMailScreen
    }, {
        name: "Chat",
        icon: "ic_chat",
        disabled: false,
        component: ChannelScreen
    }, {
        name: "Watch",
        icon: "ic_watch",
        disabled: true,
        component: ConsumerWatchScreen
    }, {
        name: "Profile",
        icon: "ic_user",        
        disabled: false,
        component: ConsumerProfileScreen
    }
];
const dentistTabs = [
    {
        name: "Mail",
        icon: "ic_mail",        
        disabled: true,
        component: DentistMailScreen
    }, {
        name: "Chat",
        icon: "ic_chat",        
        disabled: false,
        component: ChannelScreen
    }, {
        name: "Profile",
        icon: "ic_user",        
        disabled: true,
        component: DentistProfileScreen
    }
]
const HomeNavigator = ({navigation}) => {
    const { user, chatBadge, userProfile } = React.useContext(AuthContext);
    if (!userProfile) {
        return null;
    }
    const isConsumer = userProfile.type === "consumer";
    const activeTabs = 
        isConsumer ? consumerTabs : dentistTabs;

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Chat"
        >
        {
            activeTabs.map(t => t.disabled ? null : (
                <Tab.Screen
                    key={t.name}
                    name={t.name}
                    options={{                            
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused, color}) => {
                            if (t.name === "Chat") {
                                return (
                                    <View style={styles.badgeWrapper}>
                                        {chatBadge && <View style={styles.badge}/>}
                                        <Image source={Images[focused ? t.icon : `${t.icon}_inactive`]}/>
                                    </View>
                                )
                            } else {
                                return (
                                    <Image source={Images[focused ? t.icon : `${t.icon}_inactive`]}/>
                                );
                            }
                        }
                    }}
                >
                 {
                    ({navigation: n}) => {
                        const Screen = t.component;
                        return (
                            <Screen
                                navigation={n}
                                parentNavigation={navigation}
                            />
                        );
                    }
                 }
                </Tab.Screen>
            ))
        }
        </Tab.Navigator>
    );
};

export default HomeNavigator;