import {StyleSheet, Dimensions} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import { textScale } from '../../utils/textUtil';
import { getDeviceHeight } from '../../utils/extension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  containerInner: {
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    minHeight: scale(610),
    marginHorizontal: scale(27)
  },
  logo: {    
    marginTop: scale(75),
    width: scale(246),
    height: scale(130),
  },
  inputForm: {
    marginTop: scale(86)
  },
  divider: {
    height: scale(19)
  },
  noteWrapper: {  
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: scale(47)
  },
  noteText: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: 15,
    color: Colors.primaryColor
  },
  loginWrapper: {
    width: '100%',
    marginTop: scale(46)
  },
  forgetWrapper: {
    marginTop: scale(24),
    width: '100%',
    alignItems: 'flex-end'
  }
});
