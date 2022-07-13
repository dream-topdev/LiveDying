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
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        minHeight: scale(610),
        paddingHorizontal: scale(27),
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: scale(40),
    },
    message: {
        width: '100%',
        marginTop: scale(70),
        borderRadius: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    youtube: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textYoutube: {
        marginRight: scale(10)
    },
    songList: {
        marginTop: scale(18),
        flex: 5
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
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: scale(20)
    },
    footerInner: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(0),
    },
    notetext: {
        fontFamily: Fonts.EpilogueBold,
        fontSize: scale(30),
        color: Colors.black,
    },
    buttonEnter: {
        backgroundColor: Colors.primaryBackColor
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
        height: scale(10)
    },
    testReminderWrapper: {
        width: '100%',
        marginTop: scale(83),
    },
    forgetWrapper: {
        marginTop: scale(24),
        width: '100%',
        alignItems: 'flex-end'
    },
    enterButton: {
        backgroundColor: Colors.primaryBackColor,
        paddingHorizontal: scale(26),
        paddingVertical: scale(7),
        borderRadius: scale(8)
    },
    buttonContent: {
        color: Colors.primaryColor,
        fontSize: scale(14)
    }
});