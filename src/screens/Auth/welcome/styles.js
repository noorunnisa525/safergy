import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },

    logoStyle: {
      height: hp(9.5),
      width: wp(80),
      alignSelf: 'center',
      marginTop: hp(13),
      marginBottom: hp(4),
    },

    logoContainerStyle: {
      alignSelf: 'center',
      marginTop: hp(7),
      marginBottom: hp(5),
    },
    innerContainer: {
      flexGrow: 1,
      padding: wp(10),
      backgroundColor: theme.color.backgroundColor,
      justifyContent: 'space-between',
    },

    textName: {
      color: theme.color.davyGrey,
      marginTop: hp(10),
      fontSize: theme.size.large,
      fontFamily: theme.family.bold,
      textTransform: 'capitalize',
    },
    textIntro: {
      alignSelf: 'flex-end',
      color: theme.color.primaryText,
      fontSize: hp(1.9),
      fontFamily: theme.family.semibold,
    },
    textSwipe: {
      alignSelf: 'center',
      color: theme.color.primaryText,
      fontSize: theme.size.small,
      fontFamily: theme.family.semibold,
    },

    rowView: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      // marginVertical: hp(2),
      width: wp(65),
    },
  });
  return styles;
};
export default createStyles;
