import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import API from './services/API';
import { useMutation } from 'react-query';
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
  const [friendProfile, setFriendProfile] = useState(null);
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

  const { mutate: fetchFriendProfile } = useMutation(API.getProfileById, {
    onSuccess: (data) => {
      console.log('fetch profile <======>', data);
      setFriendProfile({ result: data });
      setLoading(false);
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Sorry',
        text2: 'Some issue is occured'
      });
      setLoading(false);
    }
  });

  const { mutate: login } = useMutation(API.login, {
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
      setLoading(false);
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

  const { mutate: signup } = useMutation(API.signup, {
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data.message
      })
      setLoading(false);
    },
    onError: (data) => {
      Toast.show({
        type: 'error',
        text1: 'Sorry',
        text2: data.message
      })
      setLoading(false);
    }
  })
  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        friendProfile,
        loading,
        chatBadge,
        notification,
        setFriendId: (id) => {
          setFriendId(id);
        },
        fetchProfile: (userid) => {
          setLoading(true);
          fetchProfile(userid);
        },
        fetchFriendProfile: (friendid) => {
          setLoading(true);
          fetchFriendProfile(friendid);
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
            await login(userCred);
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
        signup: async (params) => {
          setLoading(true);
          try {
            signup(params)
          } catch (e) {
            console.error(e);
          }
        },
        logout: async () => {
          try {
            await setUserProfile(null);
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