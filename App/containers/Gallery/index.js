import * as React from 'react';
import { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { scale } from '../../utils/scale';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const GalleryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.containerInner}>
          <Text style={{ fontSize: scale(50), color: 'red' }}>{'Hello world '}</Text>
          {/* <View style={styles.header}>
            <Text style={styles.notetext}>{'Agenda'}</Text>
            <Image
              source={Images.ic_logo}
              style={styles.logo}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.message}>
            <InlineContainer
              title={'Life Video:'}
              backgroundColor={Colors.backgroundColor}
              fontSize={18}
              borderRadius={0}
              paddingRight={5}
              paddingLeft={0}
              actionChild={
                <View style={styles.youtube}>
                  <IconButton
                    icon={Images.ic_add}
                    width={35}
                    height={35}
                    onPress={() => {
                      console.log('You clicked the youtube button');
                    }}
                  />
                </View>
              }
            />
          </View>
          <View style={styles.songList}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.footerInner}>
              <IconButton
                icon={Images.ic_back}
                width={52}
                height={52}
                onPress={() => {
                  console.log('You clicked the back button')
                  navigation.navigate('Speaker')
                }}
              />
              <IconButton
                icon={Images.ic_home}
                width={52}
                height={52}
                onPress={() => {
                  console.log('You clicked the back button')
                  navigation.navigate('Profile')
                }}
              />
              <IconButton
                icon={Images.ic_next}
                width={52}
                height={52}
                onPress={() => {
                  console.log('You clicked the next button')
                  navigation.navigate('Gallery')
                }}
              />
            </View>
          </View> */}
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
export default GalleryScreen;
