import { StyleSheet } from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import { scale, scaleVertical } from '../../utils/scale';
import { textScale } from '../../utils/textUtil';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.textInputBackground,
        borderRadius: scale(8),
        position: 'relative'
    },
    thumbnailWrapper: {
    },
    speakerContentWrapper: {
        flex: 1,
    },
    speakerContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: scale(36),
        paddingRight: scale(0),
    },
    speakerNameWrapper: {
    },
    speakerName: {
        marginVertical: scale(7),
        fontSize: scale(18),
        color:Colors.primaryColor
    },
    speakerTopicWrapper: {
    },
    speakerTopic: {
        flex: 1,
        height: scale(30),
        marginBottom: scale(7),
        fontSize: scale(12),
    },
    removeIconWrapper: {
        marginRight: scale(10)
    },
    divider: {
        height: scale(12)
    },
});
