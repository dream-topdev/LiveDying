import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: scale(21),
    paddingVertical: scale(15),
    borderRadius: scale(8),
    position: 'relative'
  },
  label: {
    textAlign: 'center',
    marginBottom: scale(10),
    fontSize: textScale(16)
  },
  gap: {
    height: scale(10),
  },
  icon: {
    width: scale(30),
    height: scale(30)
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
  title: {
    marginTop: scale(20),
    marginBottom: scale(15),
    fontSize: scale(18),
    color: Colors.black,
    textAlign: 'center'
  },
  toggleWrapper: {
    marginBottom: scale(15)
  },
  avatar: {
    height: scale(100),
    width: scale(100),
    overflow: 'hidden',
    borderColor: Colors.primaryColor,
    borderWidth: 4,
    borderRadius: scale(100) / 2,
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
  editAvatar: {
    width: scale(10),
    height: scale(10),
  },
  alarmWrapper: {
    alignItems: 'center'
  },

  divider: {
    height: scale(15)
  },
  inputform: {
    width: '100%',
    marginTop: scale(25)
  },
  textInput: {
    width: '100%',
    backgroundColor: Colors.textInputBackground,
    borderRadius: scale(20),
    paddingHorizontal: scale(30),
    paddingVertical: scale(20)
  },
  textInputWrapper: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
