import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useThemeAwareObject } from '@theme';

const RnText = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      textStyle: {
        color: theme.color.primaryText,
        fontSize: theme.size.small,
        fontFamily: theme.family.regular,
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <Text
      onPress={props.onPress}
      style={[styles.textStyle, props.style]}
      numberOfLines={props.numberOfLines ?? null}
      allowFontScaling={false}
    >
      {props.children}
    </Text>
  );
};

export default RnText;
