import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  AppState
} from 'react-native';
import Toast from 'react-native-toast-message';
import { getUserProfile, setUserOnline } from './services/FirebaseService';
import API from './services/API';
import { useMutation } from 'react-query';
import { RNFetchBlobFetchPolyfill } from 'rn-fetch-blob';
export const AuthContext = createContext({});

const validateEmail = (email) => {
  let isEmail = false;
  if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
    isEmail = true;
  }
  return isEmail;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatBadge, setChatBadge] = useState(false);
  const [notification, setNotification] = useState(false);
  const { mutate: fetchProfile } = useMutation(API.getProfileById, {
    onSuccess: (data) => {
      console.log('======>', data);
      setUserProfile({ result: data });
      setNotification(data.is_reminder);
      setLoading(false);
    },
    onError: (Data) => {
      Toast.show({
        type: 'error',
        text1: 'Sorry',
        text2: 'Some issue is occured'
      });
      setLoading(false);
    }
  });

  const { mutate } = useMutation(API.login, {
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Welcome',
        text2: data.message + '👋'
      });
      if (data.result.id !== undefined) {
        setUserProfile(data);
        setNotification(data.result.is_reminder);
      }
    },
    onError: (data) => {
      Toast.show({
        type: 'error',
        text1: 'Sorry',
        text2: data.message
      });
      setLoading(false)
    }
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        chatBadge,
        notification,
        fetchProfile: (userid) => {
          setLoading(true);
          fetchProfile(userid);
        },
        setBadge: (b) => {
          setChatBadge(b);
        },
        login: async (email, password) => {
          if (email !== '' && password !== '' && validateEmail(email)) {
            setLoading(true);
            const userCred = {
              email,
              password
            };
            mutate(userCred);
          }
          else if (!validateEmail(email)) {
            Toast.show({
              type: 'error',
              text1: 'Sorry',
              text2: 'Please enter correct user email.'
            });
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