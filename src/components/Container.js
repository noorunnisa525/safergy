import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeAwareObject } from '@theme';

const Container = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: theme.color.primaryColor,
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return <View style={[styles.mainContainer, props.style]}>{props.children}</View>;
};

export default Container;
