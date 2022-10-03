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
        // flex: 1,
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
        paddingHorizontal: scale(27),
    },
    backWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logo: {
        width: scale(60),
        height: scale(60),
    },
    notetext: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(30),
        color: Colors.black,
    },
    payMessage: {
        width: '100%',
        marginTop: scale(50),
        paddingHorizontal: scale(20),
        paddingVertical: scale(25),
        borderRadius: scale(20),
        shadowColor: '#404d4d',
        shadowOffset: {
            width: 0,
            height: scale(10),
        },
        shadowOpacity: 0.8,
        shadowRadius: scale(12),
        elevation: scale(5),
    },
    payMessageContent: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(22),
        lineHeight: scale(30),
        color: Colors.black,
    },
    card: {
    },
    lifespan: {
        width: '100%',
        marginTop: scale(25),
        paddingHorizontal: scale(20),
        paddingVertical: scale(27),
        borderRadius: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryBackColor,
    },
    noteMeanHeadWrapper: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(20)
    },
    notemeanhead: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(18),
        color: Colors.black,
        marginBottom: scale(3)
    },
    bodyContent: {
        flex: 1,
    },
    meaning: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.backgroundColor,
    },
    notemean: {
        fontFamily: Fonts.Light,
        fontSize: scale(18),
        color: Colors.primaryTextColor,
        lineHeight: scale(20),
        marginTop: 15
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
    noteeventmessage: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(17),
        textAlign: 'center',
        lineHeight: scale(27),
        color: Colors.secondaryColor,
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
    },
    inputForm: {
        width: '100%',
        marginTop: scale(74)
    },
    divider: {
        height: scale(14)
    },
    loginWrapper: {
        width: '100%',
        // justifyContent: 'flex-end',
        marginTop: scale(20),
        marginBottom: scale(20),
        // flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: scale(27)
    },
    forgetWrapper: {
        flexDirection: 'column',
        marginTop: scale(24),
        width: '100%',
        alignItems: 'flex-end'
    },
});
