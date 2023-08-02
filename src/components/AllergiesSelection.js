import Button from '@components/Button';
import { useThemeAwareObject } from '@theme';
import { hp, wp } from '@utils';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import { ScrollView } from 'react-native-gesture-handler';
function AllergiesSelection(props) {
  const [itemsArray, setItemsArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  useEffect(() => {
    if (props?.preSelected) {
      setItemsArray(props?.preSelected);
    }
  }, []);
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
        width: wp(60),

        paddingHorizontal: wp(3),
        marginVertical: hp(1),
        paddingVertical: hp(0.5),
        paddingRight: wp(4),
        marginRight: wp(1),
        backgroundColor: theme.color.inputFieldColor,
        borderRadius: theme.borders.radius4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: hp(1.6),
      },
      selectedView: {
        marginTop: 5,
        paddingHorizontal: wp(3),
        marginVertical: hp(0.7),
        paddingRight: wp(4),
        paddingVertical: hp(0.5),
        marginRight: wp(1),
        backgroundColor: theme.color.primaryColor,
        color: theme.color.whiteText,
        borderWidth: 0.5,
        borderColor: theme.color.primaryColor,
      },
      selectedText: {
        // backgroundColor: theme.color.primaryColor,
        color: theme.color.whiteText,
        fontFamily: theme.family.semibold,

        fontSize: hp(1.6),
      },
      unSelectedText: {
        color: theme.color.blackText,
        fontFamily: theme.family.semibold,

        fontSize: hp(1.6),
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
              <TouchableOpacity
                activeOpacity={1}
                key={item.id}
                style={[styles.btnText, itemsArray.includes(item.id) && styles.selectedView]}
                onPress={() => {
                  if (props?.multiple) {
                    let arr = [];
                    if (itemsArray.includes(item.id)) {
                      arr = itemsArray.filter(item1 => {
                        return item1 != item.id;
                      });
                    } else {
                      arr = [...itemsArray, item.id];
                    }
                    setItemsArray(arr);

                    let selectedItems = arr.map(el => {
                      const data = props?.items.find(i => i.id == el);
                      return data;
                    });
                    setSelectedItem(selectedItems);
                  } else {
                    props.closeModal();
                    props.onChange(item.id);
                  }
                }}
              >
                <Text
                  style={itemsArray.includes(item.id) ? styles.selectedText : styles.unSelectedText}
                >
                  {item?.name}
                </Text>
                {/* <Text>{item?.name}</Text> */}
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {props.multiple && (
        <Button
          title1={'Continue'}
          onPress={() => {
            if (itemsArray.length == 0) {
              props.setShowAllergyError(true);
            } else {
              props.setShowAllergyError(false);
              props.onChange(selectedItem);
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

export default AllergiesSelection;
