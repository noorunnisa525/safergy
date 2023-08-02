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
      height: hp(20),
      width: wp(95),
      alignSelf: 'center',
      borderRadius: borders.radius3,
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
      color: colors.white,
      fontFamily: fontFamily.semibold,
      textShadowOffset: {
        width: 1,
        height: 1,
      },
      textShadowColor: '#000',
      textShadowRadius: 1,
      fontSize: fontsSize.small,
      textTransform: 'capitalize',
    },
    textAddress: {
      color: colors.white,
      fontFamily: fontFamily.semibold,
      textShadowOffset: {
        width: 1,
        height: 1,
      },
      textShadowColor: '#000',
      textShadowRadius: 1,
      fontSize: fontsSize.xsmall,
      maxWidth: wp(38),
      marginHorizontal: wp(1),
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      backgroundColor: theme.color.cardBackground,
      borderRadius: theme.borders.radius3,
      // margin: wp(1),'
      width: wp(89),

      marginVertical: hp(1.2),
    },
    rowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // backgroundColor: 'red',
      marginLeft: wp(4),
      marginBottom: -hp(0.7),
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  return themeStyles;
};

function ResturantCard({ onPress, name, image, logo, address, certified }) {
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
          <Text numberOfLines={1} style={styles.textName}></Text>

          <View style={styles.rowView}>
            <View style={styles.rowContainer}>
              {Icons.MapPin()}
              <Text numberOfLines={1} style={styles.textAddress}>
                {address ?? 'No address found'}
              </Text>
            </View>
            {certified && Icons.Cerified()}
          </View>
        </ImageBackground>
      </Image>
    </TouchableOpacity>
  );
}

export default ResturantCard;
