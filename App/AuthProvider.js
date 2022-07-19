import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  AppState
} from 'react-native';
import Toast from 'react-native-toast-message';
import { setUserOnline } from './services/FirebaseService';
import API from './services/API';
import { useMutation } from 'react-query';
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatBadge, setChatBadge] = useState(false);
  const { mutate, isLoading } = useMutation(API.login, {
    onSuccess: data => {
      console.log(data);           
      Toast.show({
        type: 'success',
        text1: 'Welcome',
        text2: 'Log in success!👋'
      });
      setUserProfile(data);
    },
    onError: () => {
      alert("there was an error")
    }
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        chatBadge,
        setBadge: (b) => {
          setChatBadge(b);
        },
        login: async (email, password) => {
          if (email !== '' && password !== '') {
            setLoading(true);
            const userCred = {
              email,
              password
            };
            mutate(userCred);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Sorry',
              text2: 'Please enter user email and password.'
            });
          }
        },
        register: async (displayName, email, password) => {
          setLoading(true);
          try {
            await auth().createUserWithEmailAndPassword(email, password)
              .then((credential) => {
                credential.user
                  .updateProfile({ displayName: displayName })
              })
          } catch (e) {
            console.error(e);
          }
          setLoading(false);
        },
        logout: async () => {
          try {
            await setUserOnline(user.uid, false);
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}      
      <Toast />
    </AuthContext.Provider>
  )
}