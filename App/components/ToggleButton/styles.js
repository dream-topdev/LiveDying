import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.textInputBackground,
    height: scale(45),
    paddingHorizontal: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(22)
  },
  text: {
    color: Colors.primaryColor,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '400',
    fontSize: textScale(15)
  },
  inactiveText: {
    color: Colors.textInputPlacholder,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '400',
    fontSize: textScale(15)
  }
});
