import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    statusBar: theme.color.primaryColor,
    mainContainer: {
      flex: 1,
      backgroundColor: theme.color.blackText,
      alignItems: 'center',
    },
    textTry: {
      marginTop: hp(15),
      color: theme.color.whiteText,
      fontSize: theme.size.xlarge,
    },
    textSafergy: {
      marginTop: hp(1),
      color: theme.color.whiteText,
      fontSize: theme.size.xxlarge,
      fontFamily: theme.family.bold,
    },
    textPremium: {
      color: theme.color.whiteText,
      fontSize: theme.size.xlarge,
      letterSpacing: wp(2),
    },
    icon: {
      height: wp(30),
      width: wp(30),
      marginTop: hp(5),
    },
    textClick: {
      marginTop: hp(8),
      color: theme.color.whiteText,
      fontSize: theme.size.xlarge,
      fontFamily: theme.family.bold,
    },
    textReturn: {
      marginTop: hp(16),
      color: theme.color.whiteText,
      fontSize: theme.size.medium,
      //   fontFamily: theme.family.bold,
    },
  });
  return styles;
};
export default createStyles;
