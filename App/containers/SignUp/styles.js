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
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    minHeight: scale(610),
    paddingHorizontal: scale(27),
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(40),
  },
  footer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end'

  },
  logo: {
    width: scale(60),
    height: scale(60),
  },
  divider: {
    height: scale(19)
  },
  inputForm: {
    flex: 1,
    width: '100%',
    marginTop: scale(30)
  },
  noteWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: scale(20)
  },
  notetext: {
    fontFamily: Fonts.EpilogueBold,
    fontSize: scale(30),
    color: Colors.black,
  },
  loginWrapper: {
    width: '100%',
    marginTop: scale(20),
    marginBottom: scale(40)
  },
  forgetWrapper: {
    width: '100%',
    marginTop: scale(24)
  },
  backWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
