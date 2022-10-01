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
    flex: 1,
    minHeight: scale(610),
    paddingHorizontal: scale(27),
    width: '100%',
  },
  logo: {
    marginTop: scale(46),
    width: scale(246),
    height: scale(130),
  },
  inputForm: {
    flex: 1,
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
  noteText: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: 15,
    color: Colors.primaryColor
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
