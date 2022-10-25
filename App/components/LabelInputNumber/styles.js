import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(50),
    borderRadius: scale(25),
  },
  title: {
    flex: 5,
  },
  text: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '400',
    alignSelf: 'center'
  }
});
