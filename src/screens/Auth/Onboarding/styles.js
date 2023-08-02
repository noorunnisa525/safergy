import { StyleSheet } from 'react-native';
import { hp, wp } from '@utils';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      backgroundColor: theme.color.primaryColor,
    },
    statusbarColor: theme.color.tertiaryColor,
    fullBackground: {
      height: hp(100),
      width: wp(100),
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerImage: {
      height: hp(50),
      width: wp(100),
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage: {
      height: wp(60),
      width: wp(60),
    },
    bottomView: {
      flex: 1,
    },
    headingText: {
      color: theme.color.secondaryText,
      fontSize: theme.size.medium,
      fontFamily: theme.family.book,
      textAlign: 'center',
      marginTop: hp(8),
    },
    nameText: {
      fontSize: theme.size.large,
      fontFamily: theme.family.bold,
      alignSelf: 'center',
      textAlign: 'center',
      width: wp(70),
      marginTop: hp(2),
    },
    whiteText: {
      marginTop: 0,
      color: theme.color.headerText,
    },
    subHeadingText: {
      color: theme.color.subPrimaryText,
      fontSize: theme.size.xsmall,
      fontFamily: theme.family.book,
      alignSelf: 'center',
      textAlign: 'center',
      width: wp(80),
      marginTop: hp(2),
    },
    buttonView: {
      position: 'absolute',
      bottom: 0,
      left: wp(15),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      width: wp(70),
      marginBottom: hp(3),
    },
    proceedText: {
      fontFamily: theme.family.semiBold,
      width: wp(20),
      textAlign: 'center',
    },
    proceedWhiteText: {
      color: theme.color.headerText,
    },
    skipText: {
      color: theme.color.subTertiaryText,
      fontFamily: theme.family.semiBold,
      width: wp(20),
      textAlign: 'center',
    },
    paginationContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    paginationDot: {
      height: hp(1),
      width: hp(1),
      marginHorizontal: wp(2),
      borderRadius: theme.borders.radius1,
      backgroundColor: theme.color.paginationColor,
    },
    activePagination: {
      backgroundColor: theme.color.secondaryColor,
    },
    arabicButton: {
      flexDirection: 'row-reverse',
    },
  });
  return styles;
};
export default createStyles;
