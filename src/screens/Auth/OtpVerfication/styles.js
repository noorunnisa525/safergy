import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    innerContainer: {
      flexGrow: 1,
      padding: wp(4),
      backgroundColor: theme.color.backgroundColor,
    },

    logoStyle: {
      height: hp(17),
      width: hp(17),
      alignSelf: 'flex-start',
      marginTop: hp(10),
    },
    resendBtn: {
      alignSelf: 'flex-end',
      marginHorizontal: wp(4),
      marginVertical: hp(1),
    },
    loginBtn: {
      marginTop: hp(2),
      height: hp(6),
      width: wp(88),
      backgroundColor: theme.color.primaryColor,
      borderRadius: theme.borders.radius1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    welcomeText: {
      alignSelf: 'center',
      fontFamily: theme.family.semibold,
    },
    pleaseText: {
      alignSelf: 'center',
    },

    loginText: {
      color: theme.color.whiteText,
      fontFamily: theme.family.bold,
    },
    infoText: {
      marginTop: -hp(2),
      marginHorizontal: wp(3),
      fontSize: theme.size.large,
      fontFamily: theme.family.semibold,
    },
    titleText: {
      marginHorizontal: wp(3),
      fontSize: hp(1.6),
      fontFamily: theme.family.semibold,
      marginVertical: hp(2),
    },
    loadingView: { flex: 1, justifyContent: 'center' },
    borderColor: theme.color.primaryColor,
    otpText: {
      marginHorizontal: wp(1),
      fontSize: hp(1.6),

      marginVertical: hp(2),
    },
    otpStyle: {
      marginVertical: hp(2),
      fontSize: hp(1.6),
      fontFamily: theme.family.semibold,
    },
  });
  return styles;
};
export default createStyles;
