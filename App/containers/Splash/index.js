import * as React from 'react';
import {
    SafeAreaView,
    Image,
  } from 'react-native';
import Images from '../../utils/Images';
import {styles} from './styles';

const SplashScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image            
                source={Images.ic_full_logo}
                style={styles.logo}
                resizeMode={'contain'}
            />
        </SafeAreaView>
    );
};

export default SplashScreen;