import { baseUrl } from '@constants';
import { useThemeAwareObject } from '@theme';
import { hp, wp } from '@utils';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Image from '../components/Image';
import Text from './Text';

function MenuCard(props) {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        margin: wp(2),
        width: wp(90),
        alignSelf: 'center',
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      bgImage: {
        height: wp(30),
        width: wp(30),
        alignSelf: 'center',
        borderRadius: theme.borders.radius3,
        overflow: 'hidden',
        padding: wp(5),
        justifyContent: 'space-between',
      },

      textName: {
        color: theme.color.blackText,
        fontFamily: theme.family.medium,
        marginLeft: wp(2),
        fontSize: hp(1.7),
        textTransform: 'capitalize',
      },
      allergyView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: wp(58),
        marginHorizontal: wp(2),
      },

      tagView: {},
      textContain: {
        fontFamily: theme.family.medium,
        color: theme.color.blackText,
        fontSize: hp(1.7),
        paddingVertical: hp(0.2),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  const arr = props.data.allergies.map(function (item) {
    return item.name + ', ';
  });
  arr[arr.length - 1] = arr[arr.length - 1].replace(',', '');
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.shadow}>
      <View style={styles.rowContainer}>
        <View>
          <Text numberOfLines={1} style={styles.textName}>
            {props.data.name}
          </Text>

          <View style={styles.allergyView}>
            <Text style={styles.textContain}>Contains: </Text>
            {arr.map((item, index) => (
              <>
                <Text style={styles.textContain}>{item}</Text>
              </>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default MenuCard;
