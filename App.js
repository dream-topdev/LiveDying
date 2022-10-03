/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider, } from 'react-query';
import MainNavigator from './App/navigators/MainNavigator';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthProvider } from './App/AuthProvider';
import { LogBox, NativeModules } from "react-native";
import Icons from 'react-native-vector-icons/FontAwesome';
import { StripeProvider } from '@stripe/stripe-react-native';


Icons.loadFont();
LogBox.ignoreLogs(["EventEmitter.removeListener", 'Animated.event']);
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MenuProvider>
        <AuthProvider>
          <StripeProvider publishableKey='pk_test_51LkscRBh7irzyJPIreqsIQOb87l0e76733N5nkHV0anb5ZycYthRqnmWrTRwITtKtLD3IG6boPo0iZzA8jQFnwcm00XqBvjopA'>
          <MainNavigator />
          </StripeProvider>
        </AuthProvider>
      </MenuProvider>
    </QueryClientProvider>
  )
};

export default App;
