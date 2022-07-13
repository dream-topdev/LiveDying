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
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'pink',
        marginTop: scale(18),
        // flex: 1
    },
    tabButton: {
        width: '33.3%',
        // borderBottomWidth: scale(4),
        borderColor: Colors.primaryColor,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabContent: {
        paddingVertical: scale(10),
        fontSize: scale(21)
    },
    music: {
        marginTop: scale(10),
        backgroundColor: 'pink',
        flex: 1
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
    footer: {
        // flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: scale(27),
        marginBottom: scale(20)
    },
    footerInner: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(0),
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