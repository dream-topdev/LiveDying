import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';


const superFontSize = Math.floor(scale(18) * 0.6)
const superlineHeight = superFontSize * 1.1

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(27),
    backgroundColor: Colors.backgroundColor,
  },
  containerInner: {
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    minHeight: scale(610),
    width: '100%',
  },
  lifespan: {
    width: '100%',
    marginTop: scale(25),
    paddingHorizontal: scale(20),
    paddingVertical: scale(27),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBackColor,
  },
  noteMeanHeadWrapper: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20)
  },
  notemeanhead: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(18),
    color: Colors.black,
    marginBottom: scale(3)
  },
  bodyContent: {
    flex: 1,
  },
  notetext: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(80),
    color: Colors.primaryColor
  },
  meaning: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundColor,
  },
  notemean: {
    fontFamily: Fonts.Light,
    fontSize: scale(18),
    color: Colors.primaryTextColor,
    lineHeight: scale(20),
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
  noteeventmessage: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(17),
    textAlign: 'center',
    lineHeight: scale(27),
    color: Colors.secondaryColor,
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
    justifyContent: 'flex-end',
    marginTop: scale(20),
    marginBottom: scale(20),
  },
  forgetWrapper: {
    marginTop: scale(24),
    width: '100%',
    alignItems: 'flex-end'
  },
  superStyleWrapper: {
    flexDirection: 'row'
  },
  superStyle: {
    textAlignVertical: 'top',
    fontSize: superFontSize,
    lineHeight: superlineHeight
  }
});
