import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.primaryColor,
        paddingHoriz0ontal: scale(0),
        paddingTop: scale(15),
        borderRadius: scale(8),
        position: 'relative',
        flex: 1
    },
    videoPlayer: {
        width: '100%'
    },
    label: {
        textAlign: 'center',
        marginBottom: scale(10),
        fontSize: textScale(16)
    },
    gap: {
        height: scale(10),
    },
    icon: {
        width: scale(30),
        height: scale(30)
    },
    playCircle: {
        borderRadius: scale(15),
        width: scale(30),
        height: scale(30),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: scale(10),
        top: scale(10)
    },
    titleWrapper: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: scale(18),
        color: Colors.black,
        textAlign: 'center'
    },
    toggleWrapper: {
        marginBottom: scale(15)
    },
    alarm: {
        width: scale(104),
        height: scale(64),
    },
    alarmWrapper: {
        alignItems: 'center'
    },

    divider: {
        height: scale(25)
    },
    inputform: {
        width: '100%',
        marginTop: scale(25)
    },
    loginWrapper: {
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: scale(20),
        marginBottom: scale(20),
    },
    header: {
        width: '100%',
        paddingLeft: scale(10),
        paddingBottom: scale(10),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'space-between'
    }
});
