import React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useThemeAwareObject } from '../theme';
import { hp } from '@utils';

function CustomDropDown(props) {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      dropdownPlaceholderStyle: {
        color: 'black',
        fontSize: theme.size.xsmall,
        fontFamily: theme.family.semibold,
      },
      style: {
        paddingLeft: hp(1),
        borderColor: theme.color.inputFieldColor,
        borderBottomWidth: hp(0.1),
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: theme.color.inputFieldColor,
        backgroundColor: theme.color.inputFieldColor,
      },
      dropDownContainerStyle: {
        borderColor: theme.color.inputFieldColor,
        backgroundColor: theme.color.inputFieldColor,
      },
      dropdownText: {
        fontFamily: theme.family.medium,
      },
      selectedItemStyle: {
        fontFamily: theme.family.bold,
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <DropDownPicker
      onOpen={props.onOpen}
      listMode="SCROLLVIEW"
      mode="BADGE"
      value={props.value}
      items={props.items}
      open={props.open}
      multiple={props.multiple}
      min={props.min}
      max={props.max}
      zIndex={props.zIndex}
      zIndexInverse={props.zIndexInverse}
      containerStyle={[styles.containerStyle, props.containerStyle]}
      placeholder={props.placeholder}
      placeholderStyle={[styles.dropdownPlaceholderStyle, props.placeholderStyle]}
      onChangeValue={props.onChangeValue}
      labelStyle={styles.dropdownText}
      style={[styles.style, props.style]}
      dropDownContainerStyle={[styles.dropDownContainerStyle, props.dropDownContainerStyle]}
      disabled={props.disabled}
      selectedItemLabelStyle={styles.selectedItemStyle}
      listItemLabelStyle={styles.dropdownText}
      setOpen={props.setOpen}
      setItems={props.setItems}
      setValue={props.setValue}
    />
  );
}

export default CustomDropDown;
