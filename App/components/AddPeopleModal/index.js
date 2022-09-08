import * as React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { styles } from './styles';
import Colors from '../../utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../../utils/Images';
import ReminderInput from '../../components/ReminderInput';
import OutlineButton from '../OutlineButton';
import IconButton from '../IconButton';
import AuthInput from '../AuthInput';


const AddPeopleModal = ({
  title,
  visible,
  onClose,
  onSuccess,
  avatarUrl,
  firstName = '',
  lastName = '',
  topic = '',
  setFirstName,
  setLastName,
  setTopic,
  textAreaVisible = true,
  onClickEditButton,
  isOkButtonDisable
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        onClose();
      }}
      onBackButtonPress={() => {
        onClose();
      }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.playCircle}
          onPress={onClose}
        >
          <Icon
            name="close"
            size={15}
            style={styles.playIcon}
          />
        </TouchableOpacity>
        <View style={styles.alarmWrapper}>
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatar}
          />
          <View style={styles.editAvatarWrapper}>
            <IconButton
              icon={Images.ic_edit}
              width={25}
              height={25}
              onPress={onClickEditButton}
            />
          </View>
        </View>
        <View style={styles.inputForm}>
          <AuthInput
            placeholder={'First Name'}
            borderType={'roundBottom'}
            value={firstName}
            onChangeText={setFirstName}
          />
          <View style={styles.divider} />
          <AuthInput
            placeholder={'Last Name'}
            borderType={'roundBottom'}
            value={lastName}
            onChangeText={setLastName}
          />
          {
            textAreaVisible &&
            <>
              <View style={styles.divider} />
              <View style={styles.textInputWrapper}>
                <TextInput
                  placeholder={'Enter speaker topic'}
                  onChangeText={setTopic}
                  placeholderTextColor={Colors.textInputPlacholder}
                  returnKeyType="next"
                  style={styles.textInput}
                  numberOfLines={5}
                  value={topic}
                />
              </View>
            </>
          }
          <View style={styles.divider} />
          <View style={styles.divider} />
          <OutlineButton
            title="Done"
            loading={isOkButtonDisable}
            loadingContent={<Text style={{ color: Colors.white }}>{'Done'}</Text>}
            backColor={isOkButtonDisable ? Colors.primaryBackColor : Colors.primaryColor}
            onPress={() => {
              onClose();
              onSuccess();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

AddPeopleModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  topic: PropTypes.string,
  setFirstName: PropTypes.func,
  setLastName: PropTypes.func,
  setTopic: PropTypes.func,
  textAreaVisibleF: PropTypes.bool,
  onClickEditButton: PropTypes.func,
  avatarUrl: PropTypes.string,
  isOkButtonDisable: PropTypes.bool,
}

export default AddPeopleModal;