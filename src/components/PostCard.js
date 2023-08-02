import { baseUrl, borders, colors, fontFamily, fontsSize } from '@constants';
import { useThemeAwareObject } from '@theme';
import { hp, wp } from '@utils';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import Image from '../components/Image';
import Text from './Text';
import Icons from '../../assets/Icons';

const createStyles = theme => {
  const themeStyles = StyleSheet.create({
    bgImage: {
      height: hp(14),
      width: wp(87),
      alignSelf: 'center',
      borderTopLeftRadius: borders.radius3,
      borderTopRightRadius: borders.radius3,
      overflow: 'hidden',
      padding: wp(5),
      justifyContent: 'space-between',
    },
    logoImage: {
      height: wp(18),
      width: wp(28),
      alignSelf: 'center',
      top: hp(3),
      position: 'absolute',
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: theme.color.whiteBackground,
    },
    textName: {
      color: colors.black,
      fontFamily: fontFamily.semibold,
      maxWidth: wp(28),
      fontSize: fontsSize.small,
      textTransform: 'capitalize',
    },
    textAddress: {
      color: colors.blackText,
      fontFamily: fontFamily.bold,

      fontSize: fontsSize.xsmall,
      maxWidth: wp(38),
      marginHorizontal: wp(1),
    },
    shadow: {
      shadowColor: '#000',
      width: wp(87),
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      backgroundColor: theme.color.cardBackground,
      borderRadius: theme.borders.radius3,
      // borderWidth: hp(0.2),
      // borderColor: theme.color.primaryColor,
      margin: wp(1),
      marginVertical: hp(1.2),
    },
    rowView: {
      flexDirection: 'row',
      height: hp(5),
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: wp(4),
      borderWidth: hp(0.3),
      borderColor: theme.color.primaryColor,
      borderBottomLeftRadius: theme.borders.radius3,
      borderBottomRightRadius: theme.borders.radius3,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  return themeStyles;
};

function PostCard({ onPress, name, image, logo, address, certified }) {
  const styles = useThemeAwareObject(createStyles);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.mainContainer}>
      <Image style={styles.shadow}>
        <ImageBackground
          resizeMode="cover"
          style={styles.bgImage}
          source={{ uri: baseUrl.imageUrl + image }}
          imageStyle={{ opacity: 0.7 }}
        >
          {logo && (
            <Image
              style={styles.logoImage}
              resizeMode="cover"
              source={{ uri: baseUrl.imageUrl + logo }}
            />
          )}
        </ImageBackground>
        <View style={styles.rowView}>
          <View style={styles.rowContainer}>
            {Icons.MapPin()}
            <Text numberOfLines={1} style={styles.textAddress}>
              {address ?? 'No address found'}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.textName}>
            {name}
          </Text>
        </View>
      </Image>
    </TouchableOpacity>
  );
}

export default PostCard;
