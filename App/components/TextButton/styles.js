import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    padding: scale(5),
    paddingHorizontal: scale(20)
  },
  text: {
    color: Colors.primaryColor,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '400',
    fontSize: textScale(15)
  }
});
