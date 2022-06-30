import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { styles } from './styles';
import Colors from '../../utils/Colors';
import ApplicationStyles from '../../utils/ApplicationStyles';
import SmoothPicker from 'react-native-smooth-picker';
import LinkButton from '../LinkButton';
import TextButton from '../TextButton';


const sizeText = {
    0: 20,
    1: 15,
    2: 10,
  };
const Item = React.memo(
    ({ selected, vertical, fontSize, name, isLastIndex }) => {
      return (
        <View
            style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                backgroundColor: selected ? Colors.primaryColor : Colors.white,
            }}>
            <Text
                style={{ 
                    fontSize: selected ? 25 : 20,
                    color: selected ? Colors.white : Colors.textColor,
            }}>
            {name}
            </Text>
        </View>
      );
    }
);

const ItemToRender = ({ item, index }, indexSelected, vertical, lastIndex) => {
    const selected = index === indexSelected;
    const isLastIndex = index >= lastIndex;
    const gap = Math.abs(index - indexSelected);

    let fontSize = sizeText[gap];
    if (gap > 1) {
        fontSize = sizeText[2];
    }

    return (
        <Item
          selected={selected}
          vertical={vertical}
          fontSize={fontSize}
          name={item}
          isLastIndex={isLastIndex}
        />
    );
};

const YearPickerModal = ({ type, visible, onHide, onSelected }) => {
    const currentYear = new Date().getFullYear();
    const numberArray = new Array(100).fill(1).map((x, i) => currentYear - i);
    function handleChange(index) {
        setSelected(index >= numberArray.length - 1 ? numberArray.length - 2 : index);
    }
    const [selected, setSelected] = React.useState(40);
    const initialValues = [{ id: 'year', value: 1990 }];
    const [year, setYear] = React.useState(initialValues);
    const years = [
        { id: 'year', label: '', min: 1900, max: new Date().getFullYear() },
    ];

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => {
                onHide();
            }}
            onBackButtonPress={() => {
                onHide();
            }}
        >
            <View style={styles.container}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>{currentYear - selected}</Text>
                </View>
                <SmoothPicker
                    initialScrollToIndex={selected}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={true}
                    data={numberArray}
                    selectOnPress={true}
                    magnet
                    scrollAnimation
                    onSelected={({ item, index }) => handleChange(index)}
                    renderItem={(option) => ItemToRender(option, selected, true, numberArray.length - 1)}
                />
                <View style={styles.buttonWrapper}>
                    <TextButton title="Cancel" onPress={()=>onHide()}/>
                    <TextButton title="OK" onPress={()=>onSelected(currentYear - selected)}/>
                </View>
            </View>
        </Modal>
    );
};

YearPickerModal.propTypes = {
    type: PropTypes.string,
    visible: PropTypes.bool
}

export default YearPickerModal;