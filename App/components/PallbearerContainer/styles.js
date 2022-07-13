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
        backgroundColor: Colors.textInputBackground,
        borderRadius: scale(8)
    },
    text: {
        color: Colors.textInputPlacholder,
        fontFamily: Fonts.EpilogueBold,
        fontWeight: '400',
    },
    thumbnailWrapper: {
        // width: '30%'
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        paddingLeft: scale(26)
    },
    name: {
        color: Colors.primaryColor,
        fontSize: scale(18)
    },
    removeIcon: {
        marginRight: scale(10)
    }
});
