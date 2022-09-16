import * as React from 'react';
import {
	Text,
	TouchableOpacity,
	ActivityIndicator,
	Image
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import Colors from '../../utils/Colors';
import Images from '../../utils/Images';

const defaultLoadingContent = < ActivityIndicator size="small" color="white" />;
const OutlineButton = ({ title,
	loading,
	onPress,
	addIcon = false,
	iconSource,
	loadingContent = defaultLoadingContent,
	backColor = Colors.primaryColor,
	color = Colors.white
}) => {
	return (
		<TouchableOpacity
			style={[styles.container, { backgroundColor: backColor }]}
			disabled={loading}
			onPress={onPress}
		>
			{loading ? (
				loadingContent
			) : (
				<>
					<Text style={[styles.text, { color: color }]}>
						{title}
					</Text>
					{
						addIcon &&
						<Image
							style={{
								borderColor: Colors.white,
								width: 24,
								height:24,
								borderRadius: 12,
								borderWidth: 2,
							}}
							source={iconSource}
						/>
					}
				</>
			)}
		</TouchableOpacity>
	);
};

OutlineButton.propTypes = {
	title: PropTypes.string,
	loading: PropTypes.bool,
	addIcon: PropTypes.bool,
	iconSource: PropTypes.any,
	onPress: PropTypes.func.isRequired,
	loadingContent: PropTypes.any
}

export default OutlineButton;