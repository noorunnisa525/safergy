import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useThemeAwareObject } from '../theme';
import { hp, wp } from '@utils';
import Text from './Text';

const CustomInputMask = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      style: {
        paddingHorizontal: wp(3.9),
        borderColor: theme.color.inputFieldColor,
        backgroundColor: theme.color.inputFieldColor,
        borderRadius: theme.borders.radius4,
        height: hp(5.3),
        marginVertical: hp(0.5),
        marginBottom: hp(1.5),
        alignItems: 'center',
        width: wp(88),
        alignSelf: 'center',
        fontSize: theme.size.small,
        fontFamily: theme.family.semibold,
      },

      placeholderColor: theme.color.placeholderText,
      errorText: {
        fontSize: theme.size.xsmall,
        paddingHorizontal: wp(4),
        color: theme.color.errorText,
        marginBottom: hp(0.5),
        marginTop: -hp(1),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <>
      <TextInputMask
        type={'custom'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '+(99) ',
          mask: '+9 (999) 999-9999',
        }}
        value={props.value}
        onChangeText={props.onChangeText}
        onChange={props.onChange}
        placeholder={props.placeholder}
        placeholderTextColor={styles.placeholderColor}
        allowFontScaling={false}
        keyboardType={props.keyboardType}
        onBlur={props.onBlur}
        maxLength={props.maxLength}
        style={[styles.style, props.style]}
      />
      {props.error && <Text style={[styles.errorText, props.errorStyle]}>{props.error}</Text>}
    </>
  );
};

export default CustomInputMask;
