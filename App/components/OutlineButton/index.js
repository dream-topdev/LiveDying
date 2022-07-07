import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './styles';
import Colors from '../../utils/Colors';

const OutlineButton = ({ title, loading, onPress, backColor=Colors.primaryColor, color=Colors.white}) => {
	return (
		<TouchableOpacity
			style={[styles.container, {backgroundColor: backColor}]}
			disabled={loading}
			onPress={onPress}
		>
				{loading ? (
					<ActivityIndicator size="small" color="white" />
				) : (
					<Text style={[styles.text, {color: color}]}>
						{title}
					</Text>
				)}
		</TouchableOpacity>
	);
};

OutlineButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
}

export default OutlineButton;