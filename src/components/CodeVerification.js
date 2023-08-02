import { colors } from '@constants';
import { hp, wp } from '@utils';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill } from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: { width: '95%', alignSelf: 'center' },
  title: { textAlign: 'center', fontSize: wp(8) },
  codeFieldRoot: {
    marginTop: 20,
    padding: 0,
    margin: 0,
  },
  cell: {
    width: hp(6),
    height: hp(6),
    lineHeight: hp(6),
    fontSize: wp(9), // 30,
    color: '#666768',
    borderBottomWidth: 2,
    borderColor: 'darkgray',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    overflow: 'hidden',
  },
  focusCell: {
    borderColor: colors.primaryText,
  },
});

const CELL_COUNT = 6;

const codeVerification = ({ verifyCode, props }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={input => {
          setValue(input);
          verifyCode(input);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text key={index} style={[styles.cell, isFocused ? styles.focusCell : styles.title]}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default codeVerification;
