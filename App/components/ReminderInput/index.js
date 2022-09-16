import * as React from 'react';
import { useState } from 'react'
import {
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import Images from '../../utils/Images';
import IconButton from '../../components/IconButton';
import { scale, scaleVertical } from '../../utils/scale';


const ReminerInput = ({ 
    description, 
    itemList, 
    initialIndex, 
    setPickerListItem
 }) => {
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
                        setPickerListItem(-1)
                    }}
                />
                <Text style={styles.pickerItem}>{itemList[initialIndex]}</Text >
                <IconButton
                    icon={Images.ic_next}
                    width={scale(24)}
                    height={scale(24)}
                    onPress={() => {
                        // let currentIndex = getIndexEqualTo(itemList, pickerListItem);
                        // let nextIndex = (++currentIndex + itemList.length) % itemList.length;
                        // setPickerListItem(itemList[nextIndex])
                        setPickerListItem(1)
                    }}
                />
            </View>
        </View >
    );
};

ReminerInput.propTypes = {
    description: PropTypes.string,
    itemList: PropTypes.array,
    initialIndex: PropTypes.number,
    setPickerListItem: PropTypes.func
}

export default ReminerInput;