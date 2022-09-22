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
        alignItems: 'center',
        marginTop: scale(40),
    },
    backWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleWrapper: {
        marginTop: scale(20),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleContent: {
        fontSize: scale(25),
        color: Colors.primaryColor
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: scale(20),
        paddingHorizontal: scale(25),
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
    userInfoRight: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lifeSpanWrapper: {
    },
    lifeSpan: {
        fontSize: scale(72),
        color: Colors.primaryColor
    },
    birthdayWrapper: {
    },
    birthday: {
        fontSize: scale(20),
        color: Colors.secondaryColor,
        fontWeight: 'bold',
        marginBottom: scale(20)
    },
    topWish: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: scale(20),
        paddingHorizontal: scale(25),
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
    topWishItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: scale(5)
    },
    topWishBadgeWrapper: {
        width: '100%',
        borderRadius: scale(20),
        borderColor: Colors.primaryColor,
        borderWidth: scale(2),
        alignItems: 'center'
    },
    topWishBadge: {
        color: Colors.primaryColor,
        fontSize: scale(22),
        marginVertical: scale(5)
    },
    topWishBody: {
        marginTop: scale(20)
    },
    topWishIdWrapper: {
        backgroundColor: Colors.primaryBackColor,
        paddingHorizontal: scale(4)
    },
    topWishId: {
        color: Colors.primaryColor,
        fontSize: scale(18),
        fontVariant: ['tabular-nums']
    },
    topWishContentWrapper: {
        marginHorizontal: scale(5)
    },
    topWishContent: {
        fontSize: scale(18)
    },
    funeralInfo: {
        flexDirection: 'column',
        // justifyContent: 'space-around',
        // alignItems: 'flex-start',
        marginTop: scale(20),
        flex: 1,
        paddingHorizontal: scale(25),
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
    footer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: scale(20),
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
        fontSize: scale(25),
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
    avatarWrapper: {
        borderRadius: scale(60),
        borderColor: Colors.primaryColor,
        overflow: 'hidden',
        borderWidth: scale(5),
        width: scale(120),
        height: scale(120),
    },
    avatar: {
        borderWidth: scale(2),
        width: scale(120),
        height: scale(120),
    },
    inputForm: {
        width: '100%',
        marginTop: scale(74)
    },
    divider: {
        height: scale(20)
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
    },
    tabContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: scale(20)
    },
    cardStyle: {
        backgroundColor: Colors.secondaryBackColor,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: scale(3),
        borderRadius: scale(10),
        marginTop: scale(10),
        marginHorizontal: scale(5),
        height: scale(150),
    },
    musicTitle: {
        marginHorizontal: scale(10),
        color: Colors.primaryColor,
        fontSize: scale(15)
    },
    imageTitle: {
        color: Colors.primaryColor,
        fontSize: scale(20)
    },
});