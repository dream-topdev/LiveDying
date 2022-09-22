/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
   QueryClient,
   QueryClientProvider,
 } from 'react-query';

import MainNavigator from './App/navigators/MainNavigator';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthProvider } from './App/AuthProvider';

import { LogBox } from "react-native";
import Icons from 'react-native-vector-icons/FontAwesome';
import TrackPlayer, { Capability } from 'react-native-track-player';
Icons.loadFont();
LogBox.ignoreLogs(["EventEmitter.removeListener", 'Animated.event']);

const queryClient = new QueryClient();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    TrackPlayer.setupPlayer()
      .then(async () => {        
        await TrackPlayer.updateOptions({
          // Media controls capabilities
          capabilities: [
              Capability.Play,
              Capability.Pause,
              Capability.SkipToNext,
              Capability.SkipToPrevious,
              Capability.Stop,
          ],
      
          // Capabilities that will show up when the notification is in the compact form on Android
          compactCapabilities: [Capability.Play, Capability.Pause],
      });
      })
      .catch(() => {
        console.log("Track Player already set up.")
      })
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MenuProvider>
        <AuthProvider>
          <MainNavigator/>
        </AuthProvider>
      </MenuProvider>
    </QueryClientProvider>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
