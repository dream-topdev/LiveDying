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
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(40),
    paddingHorizontal: scale(27)
  },
  footer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  modalStyle: {
    backgroundColor: Colors.white,
    paddingHorizontal: scale(21),
    paddingVertical: scale(35),
    borderRadius: scale(8),
    position: 'relative'
  },
  modalBody: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: scale(20)
  },
  iconWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContent: {
    marginTop: scale(20),
    fontSize: scale(18)
  },
  logo: {
    width: scale(60),
    height: scale(60),
  },
  divider: {
    height: scale(19)
  },
  inputForm: {
    // flex: 1,
    width: '100%',
  },
  avatarWrapper: {
    borderRadius: scale(60),
    borderColor: Colors.primaryColor,
    overflow: 'hidden',
    borderWidth: scale(5),
    marginTop: scale(20),
    width: scale(120),
    height: scale(120),
    justifyContent: 'center'
  },
  avatar: {
    borderWidth: scale(2),
    width: scale(120),
    height: scale(120),
    alignSelf: 'center'
  },
  editAvatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryColor,
    width: scale(30),
    height: scale(30),
    top: scale(-35),
    right: scale(-35),
    borderRadius: scale(20),
    borderColor: Colors.primaryColor,
    borderWidth: 4,
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
  },
  playCircle: {
    borderRadius: scale(15),
    width: scale(30),
    height: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: scale(10),
    top: scale(10)
  },
});
