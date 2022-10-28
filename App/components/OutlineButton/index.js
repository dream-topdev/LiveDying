import React, { forwardRef } from 'react';
import {
	Text,
	TouchableOpacity,
	ActivityIndicator,
	Image
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import Colors from '../../utils/Colors';
import { scale } from '../../utils/scale';
import propTypes from 'prop-types';


const defaultLoadingContent = < ActivityIndicator size="small" color="white" />;
const OutlineButton = forwardRef(({
	title,
	loading,
	onPress,
	addIcon = false,
	iconSource,
	loadingContent = defaultLoadingContent,
	backColor = Colors.primaryColor,
	color = Colors.white,
	width = '100%',
	height = scale(40),
	active = true
}, ref) => {
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					backgroundColor: active ? backColor : Colors.textInputPlacholder,
					width,
					height: scale(height)
				}]}
			disabled={loading}
			onPress={onPress}
			ref={ref}
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
								width: scale(24),
								height: scale(24),
								borderRadius: scale(12),
								borderWidth: scale(2),
								left: scale(40)
							}}
							source={iconSource}
						/>
					}
				</>
			)}
		</TouchableOpacity>
	);
});

OutlineButton.propTypes = {
	title: PropTypes.string,
	loading: PropTypes.bool,
	addIcon: PropTypes.bool,
	iconSource: PropTypes.any,
	onPress: PropTypes.func.isRequired,
	loadingContent: PropTypes.any,
	ref: PropTypes.any,
	widht: PropTypes.string,
	height: PropTypes.number,
	active: PropTypes.bool
}

export default OutlineButton;