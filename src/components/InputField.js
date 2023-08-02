import { Input } from '@rneui/themed';
import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { useThemeAwareObject } from '@theme';
import { hp, wp } from '@utils';
import Text from './Text';

const RnInputField = forwardRef((props, ref) => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      inputContainer: {
        borderWidth: 1,
        paddingHorizontal: wp(3),
        borderColor: theme.color.inputFieldColor,
        backgroundColor: theme.color.inputFieldColor,
        borderRadius: theme.borders.radius4,
        height: hp(5.3),

        alignItems: 'center',
      },
      container: {
        height: hp(5.3),
        marginBottom: hp(1.5),
        alignItems: 'center',
      },
      textStyle: {
        fontSize: theme.size.small,
        fontFamily: theme.family.semibold,
        textAlign: 'left',
        marginTop: hp(0.4),
      },
      errorText: {
        fontSize: theme.size.xsmall,
        paddingHorizontal: wp(4),
        color: theme.color.errorText,
        marginBottom: hp(0.5),
        marginTop: -hp(1),
      },
      placeholderColor: theme.color.placeholderText,
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <>
      <Input
        ref={ref}
        inputStyle={props.inputStyle}
        containerStyle={[styles.container, props.containerStyle]}
        onPress={props.onPress}
        inputContainerStyle={[styles.inputContainer, props.inputContainerStyle]}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        secureTextEntry={props.secure}
        editable={props.editable}
        multiline={props.multiline}
        placeholder={props.placeholder}
        numberOfLines={props.numberOfLines}
        placeholderTextColor={styles.placeholderColor}
        style={[styles.textStyle, props.style]}
        maxLength={props.maxLength}
        onChangeText={props.onChangeText}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        keyboardType={props.keyboardType}
      />
      {props.error && <Text style={[styles.errorText, props.errorStyle]}>{props.error}</Text>}
    </>
  );
});

export default RnInputField;
