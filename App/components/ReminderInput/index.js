import * as React from 'react';
import { useState } from 'react'
import {
    Image,
    View,
    TextInput,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';
import IconButton from '../../components/IconButton';
import { string } from 'yargs';
import { scale, scaleVertical } from '../../utils/scale';


const ReminerInput = ({ description, itemList }) => {
    const [pickerListItem, setPickerListItem] = useState(itemList[0]);
    const getIndexEqualTo = (array, value) => {
        const isEqualNumber = (item) => item == value
        const currentIndex = array.findIndex(isEqualNumber)
        return currentIndex
    }
    return (
        <View style={styles.container}>
            <View style={styles.desc}>
                <Text style={styles.descInner}>{description}</Text>
            </View>
            <View style={styles.picker}>
                <IconButton
                    icon={Images.ic_back}
                    width={scale(24)}
                    height={scale(24)}
                    onPress={() => {
                        let currentIndex = getIndexEqualTo(itemList, pickerListItem)
                        let backIndex = (--currentIndex + itemList.length) % itemList.length
                        setPickerListItem(itemList[backIndex])
                    }}
                />
                <Text style={styles.pickerItem}>{pickerListItem}</Text >
                <IconButton
                    icon={Images.ic_next}
                    width={scale(24)}
                    height={scale(24)}
                    onPress={() => {
                        let currentIndex = getIndexEqualTo(itemList, pickerListItem)
                        let nextIndex = (++currentIndex + itemList.length) % itemList.length
                        setPickerListItem(itemList[nextIndex])
                    }}
                />
            </View>
        </View >
    );
};

ReminerInput.propTypes = {
    description: PropTypes.string,
    itemList: PropTypes.array
}

export default ReminerInput;