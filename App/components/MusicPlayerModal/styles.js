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
    position: 'relative',
  },
  musicContainer: {
    // flex: 1,
    flexDirection: 'row',
    // height: scale(200),
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "black",
  },
  btn: {
    backgroundColor: "#ff0044",
    padding: 15,
    borderRadius: 5,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
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
  closeBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  closeBtn: {
    // backgroundColor: 'pink',
    borderRadius: scale(15),
    width: scale(30),
    height: scale(30),
    alignItems: 'center',
    justifyContent: 'center'
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
  alarm: {
    width: scale(104),
    height: scale(64),
  },
  alarmWrapper: {
    alignItems: 'center'
  },
  divider: {
    height: scale(50)
  },
  inputform: {
    width: '100%',
    marginTop: scale(25)
  },

});
