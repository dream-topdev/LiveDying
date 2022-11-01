import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: scale(10),
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
    marginTop: scale(22),
    marginBottom: scale(15),
    fontSize: scale(18),
    color: Colors.black,
    textAlign: 'center'
  },
  toggleWrapper: {
    alignItems:'left',
    marginBottom: scale(15)
  }
});
