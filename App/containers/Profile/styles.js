import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
const { width } = Dimensions.get('window');

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
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(40),
  },
  songList: {
    width: '100%',
    flex: 1
  },
  inputForm: {
    flex: 1,
    width: '100%',
    marginTop: scale(20)
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
    backgroundColor: 'pink'
  },
  forgetWrapper: {
    marginTop: scale(24),
    width: '100%',
    alignItems: 'flex-end'
  },
  selectionWrapper: {
    width: '100%',
    backgroundColor: Colors.textInputBackground,
    borderRadius: scale(25),
    paddingHorizontal: scale(3)
  },
  dropdown2BtnStyle: {
    width: '100%',
    backgroundColor: Colors.textInputBackground,
    borderRadius: scale(25),
  },
  dropdown2BtnTxtStyle: {
    width: '100%',
    color: Colors.textInputPlacholder,
    fontSize: scale(13),
    textAlign: 'left',
  },
  dropdown2DropdownStyle: {
    backgroundColor: Colors.textInputBackground,
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
  },
  dropdown2RowStyle: {
    backgroundColor: Colors.white,
  },
  dropdown2RowTxtStyle: {
    color: Colors.black,
    textAlign: 'center',
  },
  dropdown2SelectedRowStyle: {
    backgroundColor: Colors.primaryColor,
    color: Colors.white
  }
});
