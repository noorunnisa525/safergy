import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.color.whiteBackground,
    },
    leftIcon: {
      padding: wp(2),
      borderRadius: theme.borders.radius1,
    },
    textTitle: {
      color: theme.color.whiteBackground,
      fontSize: theme.size.medium,
    },
    backIcon: {
      size: wp(6),
      color: theme.color.whiteBackground,
    },
    innnerContainer: {
      marginTop: hp(5),
      padding: wp(4),
    },
    tilteText: {
      marginVertical: hp(1),
      marginHorizontal: wp(3),
      fontSize: theme.size.small,
      fontFamily: theme.family.semibold,
    },
    loginBtn: {
      marginTop: hp(4),
      height: hp(6),
      width: wp(88),
      backgroundColor: theme.color.primaryColor,
      borderRadius: theme.borders.radius1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },

    loginText: {
      color: theme.color.whiteText,
      fontFamily: theme.family.bold,
    },
  });
  return styles;
};
export default createStyles;
