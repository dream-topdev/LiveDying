import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingHorizontal: scale(21),
        paddingVertical: scale(35),
        borderRadius: scale(8),
        position: 'relative'
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
    bodyWrapper: {
        marginTop: scale(20),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        marginTop: scale(20),
        marginBottom: scale(15),
        fontSize: scale(25),
        color: Colors.black,
        textAlign: 'center'
    }
});
