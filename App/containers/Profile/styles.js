import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  containerInner: {
    alignItems: 'center',
    position: 'relative',
    // flex: 1,
    minHeight: scale(610),
    paddingHorizontal: scale(27),
    width: '100%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(40),
    paddingHorizontal: scale(27),
  },
  inputForm: {
    // flex: 1,
    width: '100%',
    marginTop: scale(74)
  },
  divider: {
    height: scale(14)
  },
  noteWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: scale(47)
  },
  notetext: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(30),
    color: Colors.black,
  },
  logo: {
    width: scale(60),
    height: scale(60),
  },
  loginWrapper: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: scale(20),
    marginBottom: scale(20)
  },
  forgetWrapper: {
    marginTop: scale(24),
    width: '100%',
    alignItems: 'flex-end'
  }
});
