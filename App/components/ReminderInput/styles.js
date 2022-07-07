import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: scale(45),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.textInputBackground,
        borderWidth: 0,
        borderRadius: scale(25),
        padding: scale(10),
        paddingHorizontal: scale(10),
    },
    picker: {
        width: '70%',
        marginHorizontal: scale(15),
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        width: scale(25),
        display: 'flex'
    },
    reminderInput: {
        color: Colors.textInputColor,
        fontFamily: Fonts.EpilogueBold,
        fontWeight: '400',
        fontSize: textScale(15),
        height: scale(45),
        flex: 1,
        padding: 0,
        margin: 0,
        marginLeft: scale(25),
        marginRight: scale(8),
    },
    desc: {
        width: '30%'
    },
    descInner: {
        color: Colors.textInputPlacholder,
        fontWeight: '400',
        fontSize: scale(15),
        height: scale(45),
        marginTop: scale(25),
    },
    pickerItem: {
        // marginTop: scale(15)
        color: Colors.primaryColor
    }
});
