import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: scale(2),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.textInputBackground,
        borderRadius: scale(20),
        marginVertical: scale(5),
        paddingVertical: scale(8),
        paddingHorizontal: scale(20),
        position: 'relative',
    },
    content: {
        fontWeight: 'bold',
        overflow: 'hidden'
    },
    closeIcon: {
        fontWeight: 'bold'
    }
});
