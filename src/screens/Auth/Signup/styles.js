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

    logoContainerStyle: {
      alignSelf: 'center',
      marginTop: hp(7),
      marginBottom: hp(5),
      borderWidth: 1,
      borderColor: theme.color.borderColor,
      backgroundColor: theme.color.backgroundColor,
      borderRadius: theme.borders.radius1,
    },
    headerStyle: { height: 5, color: theme.color.whiteBackground },

    innerContainer: {
      flexGrow: 1,
      padding: wp(4),
      backgroundColor: theme.color.backgroundColor,
    },

    forgotBtn: {
      height: hp(4),
      backgroundColor: 'transparent',
      marginHorizontal: wp(5),
      marginBottom: hp(8),
    },

    selectedAllergies: {
      borderWidth: 1,
      borderColor: theme.color.borderColor,
      backgroundColor: theme.color.backgroundColor,
      borderRadius: theme.borders.radius1,
      paddingHorizontal: wp(3),
      height: hp(6),
      width: wp(88),
      alignSelf: 'center',
      textAlignVertical: 'center',
      color: theme.color.placeholderText,
      marginTop: hp(1),
      fontSize: theme.size.xSmall,
    },
    containerView: {
      alignItems: 'center',
      paddingVertical: hp(3),
      backgroundColor: theme.color.whiteBackground,
      // marginBottom: hp(2),
    },
    imgContainer: {
      alignItems: 'center',
      marginVertical: hp(2),
      marginBottom: hp(6),

      backgroundColor: theme.color.whiteBackground,
    },
    BottomSheetContainer: {
      paddingVertical: hp(5),
      borderTopLeftRadius: theme.borders.radius1,
      borderTopRightRadius: theme.borders.radius1,
      backgroundColor: theme.color.whiteBackground,
    },
    errorContainer: {
      marginLeft: wp(4),
    },
    loginBtn: {
      // marginTop: hp(2),
      height: hp(5.2),
      width: wp(88),
      backgroundColor: theme.color.primaryColor,
      borderRadius: theme.borders.radius1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 0,
    },
    SignUpBtn: {
      height: hp(5.2),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      height: hp(6),
      width: wp(88),
      bottom: 0,
      backgroundColor: theme.color.primaryColor,
      borderRadius: theme.borders.radius1,
    },
    inputContainer: {
      height: hp(66),
    },
    nextBtn: {
      height: hp(5.2),
      width: wp(88),
      marginTop: hp(2.5),
      marginBottom: hp(1.5),
      backgroundColor: theme.color.primaryColor,
      borderRadius: theme.borders.radius4,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },

    backButton: {
      height: hp(5.2),
      width: wp(88),
      backgroundColor: theme.color.inputFieldColor,
      borderRadius: theme.borders.radius4,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    backText: {
      color: theme.color.primaryText,
      fontFamily: theme.family.semibold,
      fontSize: hp(1.6),
    },
    loginText: {
      color: theme.color.whiteText,
      fontFamily: theme.family.semibold,
      fontSize: hp(1.6),
    },
    avatar: { height: wp(30), width: wp(30) },
    attachmentStyle: {
      width: wp(29),
      height: wp(29),
      borderRadius: wp(29),
      overflow: 'hidden',
      alignSelf: 'center',
    },
    radioView: {
      alignItems: 'flex-start',
      backgroundColor: theme.color.whiteBackground,
    },
    noAttachmentStyle: {
      width: wp(29),
      height: wp(29),
      borderRadius: wp(29),
      overflow: 'hidden',
      alignSelf: 'center',
    },
    selectedList: {
      marginTop: hp(1),
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: wp(88),
      paddingHorizontal: wp(3),
      paddingVertical: hp(1.5),
      alignSelf: 'center',
      borderColor: theme.color.borderColor,
      borderRadius: theme.borders.radius1,
      borderWidth: 1,
      alignContent: 'center',
      alignItems: 'center',
    },

    rowView: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: hp(2),
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
      color: theme.color.lightText,
      marginVertical: hp('2'),
      alignSelf: 'flex-end',
      marginHorizontal: wp(2),
      fontSize: theme.size.small,
      fontFamily: theme.family.regular,
    },
    errorText: {
      fontSize: theme.size.xsmall,
      paddingHorizontal: wp(2),
      color: theme.color.errorText,
      marginVertical: hp(1),
    },
    containerStyle: {
      marginVertical: hp(0.5),
      marginBottom: hp(1.5),
    },
    maskContainerStyle: {
      marginVertical: hp(0.5),
      marginBottom: hp(1.5),
      width: wp(90),
    },
    titleText: {
      marginTop: hp(1.3),
      marginHorizontal: wp(4),
      fontSize: hp(1.6),
      fontFamily: theme.family.semibold,
    },
    insertProfileText: {
      marginTop: hp(1),
      marginHorizontal: wp(3.5),
      fontSize: theme.size.small,
      fontFamily: theme.family.bold,
      textAlign: 'center',
      marginBottom: -hp(5),
    },
    allergyText: {
      marginTop: hp(1),
      marginHorizontal: wp(3.5),
      fontSize: hp(1.6),
      fontFamily: theme.family.semibold,
    },
    infoText: {
      marginTop: -hp(2),
      marginHorizontal: wp(3),
      fontSize: theme.size.large,
      fontFamily: theme.family.semibold,
    },
    tagInputStyle: {
      borderWidth: 1,
      borderColor: theme.color.borderColor,
      backgroundColor: theme.color.backgroundColor,
      borderRadius: theme.borders.radius1,
      paddingHorizontal: wp(3),
      height: hp(6),
      width: wp(100),
    },
    tagInputContainer: {
      width: wp(90),
      height: hp(6),
      alignSelf: 'center',
      marginVertical: hp(0.5),
    },
    passwordInfo: {
      marginTop: hp(0.5),
      marginHorizontal: wp(4),
      fontSize: hp(1.4),
      fontFamily: theme.family.regular,
      textAlign: 'left',
    },
    containText: {
      marginTop: hp(1),
      marginHorizontal: wp(4),
      marginBottom: hp(2),
      fontSize: hp(1.3),
      fontFamily: theme.family.regular,
      textAlign: 'left',
    },
  });
  return styles;
};
export default createStyles;
