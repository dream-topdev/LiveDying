import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';

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
        // width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scale(40),
    },
    message: {
        width: '100%',
        marginTop: scale(20),
        paddingHorizontal: scale(25),
        paddingVertical: scale(25),
        borderRadius: scale(20),
        justifyContent: 'flex-start',
        shadowColor: '#404d4d',
        shadowOffset: {
            width: 0,
            height: scale(10),
        },
        shadowOpacity: 0.8,
        shadowRadius: scale(12),
        elevation: scale(5),
    },
    headerInner: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(30),
        color: Colors.black,
    },
    notetext: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(18),
        lineHeight: scale(30),
        color: Colors.black,
        marginBottom: scale(10)
    },
    plannote: {
        marginTop: scale(8),
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(18),
        lineHeight: scale(30),
        textAlign: 'left',
        color: Colors.primaryColor
    },
    topwishlist: {
        width: '100%',
        marginTop: scale(30),
        // justifyContent: 'center',
        backgroundColor: Colors.backgroundColor,
    },
    notemeanhead: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(18),
        color: Colors.black,
        marginBottom: scale(3)
    },
    notemean: {
        fontFamily: Fonts.Light,
        fontSize: scale(18),
        color: Colors.primaryTextColor,
        lineHeight: scale(27),
        marginTop: scale(15)
    },
    eventhint: {
        width: '100%',
        marginTop: scale(30),
        paddingHorizontal: scale(52),
        paddingVertical: scale(15),
        borderRadius: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryBackColor,
    },
    noteeventhint: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(17),
        textAlign: 'center',
        lineHeight: scale(27),
        color: Colors.primaryColor,
    },
    sharemessage: {
        width: '100%',
        marginTop: scale(15),
        paddingHorizontal: scale(74),
        paddingVertical: scale(16),
        borderRadius: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondaryBackColor,
        opacity: 0.1
    },
    logo: {
        width: scale(60),
        height: scale(60),
    },
    inputForm: {
        width: '100%',
        marginTop: scale(74)
    },
    divider: {
        height: scale(18)
    },
    editTopWish: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: scale(20),
    },
    testReminderWrapper: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: scale(20),
    },
    loginWrapper: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: scale(20),
    },
    forgetWrapper: {
        marginTop: scale(24),
        width: '100%',
        alignItems: 'flex-end'
    },
});
