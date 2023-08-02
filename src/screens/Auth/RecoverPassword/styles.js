import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },

    logoStyle: {
      height: wp(25),
      width: wp(50),
      alignSelf: 'center',
      marginTop: hp(10),
      marginBottom: hp(5),
    },

    logoContainerStyle: {
      alignSelf: 'center',
      marginTop: hp(7),
      marginBottom: hp(5),
    },
    innerContainer: {
      flexGrow: 1,
      padding: wp(4),
      backgroundColor: theme.color.backgroundColor,
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

    loginText: {
      color: theme.color.whiteText,
      fontFamily: theme.family.bold,
    },

    containerStyle: { marginVertical: hp(0.5) },
    tilteText: {
      marginTop: hp(1),
      marginHorizontal: wp(3),
      fontSize: theme.size.small,
      fontFamily: theme.family.semibold,
    },
  });
  return styles;
};
export default createStyles;
