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
  message: {
    width: '100%',
    marginTop: scale(35),
    paddingHorizontal: scale(25),
    paddingVertical: scale(25),
    borderRadius: scale(20),
    justifyContent: 'center',
    shadowColor: '#404d4d',
    shadowOffset: {
      width: scale(0),
      height: scale(10),
    },
    shadowOpacity: 0.8,
    shadowRadius: scale(12),
    elevation: scale(5),
  },
  notetext: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(20),
    lineHeight: scale(30),
    color: Colors.black,
    // textAlign:'center'
  },
  plannote: {
    marginTop: scale(20),
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(20),
    lineHeight: scale(30),
    // textAlign:'center',
    color: Colors.primaryColor
  },
  topwishlist: {
    flex: 1,
    width: '100%',
    marginTop: scale(30),
    justifyContent: 'flex-start',
    backgroundColor: Colors.backgroundColor,
  },
  topwishItenWrapper: {
    marginBottom: scaleVertical(18)
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
    opacity: 0.1
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
    height: scale(18)
  },
  loginWrapper: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: scale(20),
  },
  forgetWrapper: {
    marginTop: scale(24),
    width: '100%',
    alignItems: 'flex-end'
  },
});
