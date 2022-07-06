import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
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
    paddingHorizontal: scale(27),
    width: '100%',
  },
  lifespan: {
    width: '100%',
    marginTop: scale(35),
    paddingHorizontal: scale(20),
    paddingVertical: scale(47),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackColor,
  },
  notetext: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(80),
    color: Colors.primaryColor
  },
  meaning: {
    width: '100%',
    marginTop: scale(30),
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor,
  },
  notemeanhead: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(18),
    color: Colors.black,
    marginBottom: scale(3)
  },
  notemean: {
    fontFamily: Fonts.Light,
    fontSize: scale(18),
    color: Colors.primaryTextColor,
    lineHeight: scale(27),
    marginTop: 15
  },
  eventhint: {
    width: '100%',
    marginTop: scale(30),
    paddingHorizontal: scale(52),
    paddingVertical: scale(15),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackColor,
  },
  noteeventhint: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(17),
    textAlign: 'center',
    lineHeight: scale(27),
    color: Colors.primaryColor,
  },
  sharemessage: {
    width: '100%',
    marginTop: scale(15),
    paddingHorizontal: scale(74),
    paddingVertical: scale(16),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBackColor,
    opacity:0.1
  },
  logo: {
    marginTop: scale(46),
    width: scale(246),
    height: scale(130),
  },
  inputForm: {
    width: '100%',
    marginTop: scale(74)
  },
  divider: {
    height: scale(14)
  },
  loginWrapper: {
    width: '100%',
    marginTop: scale(46)
  },
  forgetWrapper: {
    marginTop: scale(24),
    width: '100%',
    alignItems: 'flex-end'
  },
});
