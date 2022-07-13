import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.textInputBackground,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: scale(50),
    borderRadius: scale(25),
  },
  text: {
    color: Colors.textInputPlacholder,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '400',
  }
});
