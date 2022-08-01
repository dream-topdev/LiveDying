import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
  image: {
    // borderRadius: scale(1)
  }
});
