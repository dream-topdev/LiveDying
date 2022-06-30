import {StyleSheet} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {scale, scaleVertical} from '../../utils/scale';
import {textScale} from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    height: scale(500)
  },
  label: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: textScale(25)
  },
  labelWrapper: {
    backgroundColor: Colors.primaryColor,
    padding: scale(12),
  },
  buttonWrapper: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
