import { StyleSheet, Dimensions } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';
import { getDeviceHeight } from '../../utils/extension';

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
    logoWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(46),
    },
    logo: {
        width: scale(246),
        height: scale(130),
    },
    notetextWrapper: {
        width: '100%',
        marginTop: scale(33),
        paddingHorizontal: scale(28),
        paddingVertical: scale(28),
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
    notetext: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(18),
        lineHeight: scale(30),
        color: Colors.primaryColor,
    },
    shareContainter: {
        // flex: 1,
        marginTop: scale(44),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignitem: 'center',
        // marginBottom: scale(30)
    },
    shareYouWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: scale(30),
        borderWidth: scale(5),
        borderColor: Colors.primaryColor,
        paddingHorizontal: scale(20),
        paddingTop: scale(20)
    },
    shareWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: 'center',
        width: scale(96),
        height: scale(96),
        borderWidth: scale(2),
        borderColor: Colors.primaryColor,
        backgroundColor: Colors.primaryBackColor,
        borderRadius: scale(48)
    },
    shareContentWrapper: {
        marginTop: scale(14),
        marginBottom: scale(30),
        width: scale(100),
        alignItems: 'center'
    },
    shareContent: {
        color: Colors.primaryColor,
        fontFamily: Fonts.EpilogueBold,
        fontWeight: 'bold',
        fontSize: 18
    },
    seeOtherWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: scale(30),
        borderWidth: scale(5),
        borderColor: Colors.secondaryColor,
        paddingHorizontal: scale(20),
        paddingTop: scale(20)
    },
    seeWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: 'center',
        width: scale(96),
        height: scale(96),
        borderWidth: scale(2),
        borderColor: Colors.secondaryColor,
        backgroundColor: Colors.secondaryBackColor,
        borderRadius: scale(48)
    },
    seeContent: {
        color: Colors.secondaryColor,
        fontFamily: Fonts.EpilogueBold,
        fontWeight: 'bold',
        fontSize: 18
    },
});
