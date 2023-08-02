import Button from '@components/Button';
import { useThemeAwareObject } from '@theme';
import { hp, wp } from '@utils';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import { ScrollView } from 'react-native-gesture-handler';
function IntoleranceSelection(props) {
  const [selectedValues, setSelectedValues] = useState({});
  const [allergicItem, setAllergicItem] = useState();
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      confirmBtn: {
        marginTop: hp(2),
        height: hp(5.2),
        width: wp(88),
        backgroundColor: theme.color.primaryColor,
        borderRadius: theme.borders.radius4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },

      confirmText: {
        color: theme.color.whiteText,
        fontFamily: theme.family.semibold,
        fontSize: hp(1.6),
      },
      mainContainer: {
        maxHeight: hp(60),
        borderRadius: theme.borders.radius1,
        padding: wp(2),

        backgroundColor: theme.color.whiteText,
      },
      btnText: {
        marginTop: 5,
        width: wp(42),
        height: hp(5.2),
        marginVertical: hp(1),
        marginRight: wp(1),
        backgroundColor: theme.color.inputFieldColor,
        borderRadius: theme.borders.radius4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      selectedView: {
        marginTop: 5,
        marginVertical: hp(1),
        marginRight: wp(1),
        height: hp(5.2),
        backgroundColor: theme.color.primaryColor,
        color: theme.color.whiteText,
        borderWidth: 0.5,
        borderColor: theme.color.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },

      titleText: {
        fontSize: hp(1.8),
        fontFamily: theme.family.semibold,
        textAlign: 'left',
        marginHorizontal: wp(1.5),
      },

      selectedText: {
        // backgroundColor: theme.color.primaryColor,
        color: theme.color.whiteText,
        fontFamily: theme.family.semibold,

        fontSize: hp(1.8),
      },
      unSelectedText: {
        color: theme.color.blackText,
        fontFamily: theme.family.semibold,

        fontSize: hp(1.8),
      },
      backButton: {
        height: hp(5.2),
        width: wp(88),
        marginTop: hp(2),
        backgroundColor: theme.color.inputFieldColor,
        borderRadius: theme.borders.radius4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      backText: {
        color: theme.color.primaryText,
        fontFamily: theme.family.semibold,
        fontSize: hp(1.6),
      },
      flatContainer: { height: hp(35) },
    });
    return themeStyles;
  };

  const styles = useThemeAwareObject(createStyles);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.flatContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={props?.items}
          renderItem={({ item, index }) => {
            return (
              <>
                <Text style={styles.titleText}>{item?.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    key={item.id}
                    style={[
                      styles.btnText,
                      selectedValues[item.name] == 'Allergic'
                        ? styles.selectedView
                        : styles.unSelectedText,
                    ]}
                    onPress={() => {
                      let obj = { ...selectedValues, [item.name]: 'Allergic' };
                      let obj1 = { ...allergicItem, [item.id]: 'Allergic' };

                      setSelectedValues(obj);
                      setAllergicItem(obj1);
                    }}
                  >
                    <Text
                      style={[
                        styles.titleText,
                        selectedValues[item.name] == 'Allergic'
                          ? styles.selectedText
                          : styles.unSelectedText,
                      ]}
                    >
                      Allergic
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    key={item.id}
                    style={[
                      styles.btnText,
                      selectedValues[item.name] == 'Intolerant'
                        ? styles.selectedView
                        : styles.unSelectedText,
                    ]}
                    onPress={() => {
                      let obj = { ...selectedValues, [item.name]: 'Intolerant' };
                      let obj1 = { ...allergicItem, [item.id]: 'Intolerant' };

                      setSelectedValues(obj);
                      setAllergicItem(obj1);
                    }}
                  >
                    <Text
                      style={[
                        styles.titleText,
                        selectedValues[item.name] == 'Intolerant'
                          ? styles.selectedText
                          : styles.unSelectedText,
                      ]}
                    >
                      Intolerant
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        />
      </View>

      {props.multiple && (
        <Button
          title1={'Continue'}
          onPress={() => {
            if (Object.keys(selectedValues).length !== props?.items.length) {
              props.setShowAllergyError(true);
            } else {
              props.setShowAllergyError(false);
              props.onChange(allergicItem);
            }
          }}
          style={[styles.confirmBtn, styles.confirmText]}
        />
      )}
      <Button
        title1={'Back'}
        onPress={props.onPressBack}
        style={[styles.backButton, styles.backText]}
      />
    </View>
  );
}

export default IntoleranceSelection;
