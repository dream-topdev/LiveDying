import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    borderRadius: scale(20),
  },
  text: {
    color: Colors.textInputBackground,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '400',
    fontSize: textScale(14),
  }
});
