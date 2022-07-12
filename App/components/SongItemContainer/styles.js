import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // backgroundColor: Colors.textInputBackground,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    // height: scale(50),
    // borderRadius: scale(25),
    // paddingHorizontal: scale(17),

    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.textInputBackground,
    borderRadius: scale(8)
  },
  text: {
    color: Colors.textInputPlacholder,
    fontFamily: Fonts.EpilogueBold,
    fontWeight: '400',
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.textInputBackground,
    borderRadius: scale(8)
  },
  thumbnailWrapper: {
    width: '30%'
  },
  itemContent: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  songInfo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  songTitle: {
    fontSize: scale(18)
  },
  songArtist: {
    fontSize: scale(15)
  },
  songTime: {
    fontSize: scale(15)
  },
  removeIcon: {
    marginRight: scale(15)
  },
  divider: {
    height: scale(12)
},
});
