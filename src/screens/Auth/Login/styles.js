import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },

    logoStyle: {
      height: hp(17),
      width: hp(17),
      alignSelf: 'flex-start',
      marginTop: hp(10),
    },
    welcomeLogo: {
      height: hp(3),
      width: wp(55),
      marginTop: -hp(0.7),
      marginHorizontal: wp(5),
    },
    logoContainer: {
      alignSelf: 'flex-start',
    },
    innerContainer: {
      flexGrow: 1,
      padding: wp(4),
      backgroundColor: theme.color.backgroundColor,
    },
    orText: {
      fontSize: theme.size.medium,
      fontFamily: theme.family.semibold,
      textAlign: 'center',
      marginVertical: hp(1.5),
    },
    forgotBtn: {
      height: hp(4),
      backgroundColor: 'transparent',
      marginHorizontal: wp(5),
      marginBottom: hp(8),
    },

    loginBtn: {
      height: hp(5.2),
      width: wp(88),
      marginTop: hp(0.7),
      backgroundColor: theme.color.primaryColor,
      borderRadius: theme.borders.radius4,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },

    createButton: {
      height: hp(5.2),
      width: wp(88),
      backgroundColor: theme.color.inputFieldColor,
      borderRadius: theme.borders.radius4,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    createText: {
      color: theme.color.primaryText,
      fontFamily: theme.family.semibold,
      fontSize: hp(1.6),
    },
    loginText: {
      color: theme.color.whiteText,
      fontFamily: theme.family.semibold,
      fontSize: hp(1.6),
    },
    rowView: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    signUpText: {
      color: theme.color.primaryColor,
      fontSize: theme.size.small,
      fontFamily: theme.family.bold,
    },
    forgotPasswordContainer: {
      alignSelf: 'flex-end',
      marginHorizontal: wp(2),
    },
    forgotPassword: {
      // color: theme.color.lightText,
      marginVertical: hp('2'),
      alignSelf: 'flex-end',
      marginHorizontal: wp(2),
      fontSize: theme.size.small,
      fontFamily: theme.family.regular,
    },
    containerStyle: {
      marginVertical: hp(0.5),
      marginBottom: hp(1.5),
    },
    titleText: {
      marginTop: hp(1.3),
      marginHorizontal: wp(5),
      fontSize: hp(1.6),
      fontFamily: theme.family.semibold,
    },
    headerStyle: { height: 0, color: theme.color.whiteBackground },
  });
  return styles;
};
export default createStyles;
