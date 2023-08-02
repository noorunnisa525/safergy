import { hp, wp } from '@utils';
import { StyleSheet } from 'react-native';

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
    containerView: {
      alignItems: 'center',
      paddingVertical: hp(5),
    },
    noAttachmentStyle: {
      width: '80%',
      height: '80%',
      overflow: 'hidden',
      alignSelf: 'center',
    },
    errorText: {
      fontSize: theme.size.xsmall,
      paddingHorizontal: wp(4),
      color: theme.color.errorText,
      marginBottom: hp(0.5),
      marginTop: hp(-1),
    },
    attachmentStyle: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      alignSelf: 'center',
    },
    avatarContainer: {
      height: wp(30),
      width: wp(30),
    },
    avatarStyle: {
      height: wp(20),
      width: wp(20),
      padding: wp(5),
    },
    tilteText: {
      color: theme.color.blackText,
      marginTop: hp(1.3),
      marginHorizontal: wp(5),
      fontSize: hp(1.6),
      fontFamily: theme.family.semibold,
    },
    containerStyle: {
      marginVertical: hp(0.5),
      width: wp(90),
      alignSelf: 'center',
    },
    bottomContainer: {
      paddingHorizontal: wp(3),
    },
    tagInputStyle: {
      borderWidth: 1,
      borderColor: theme.color.borderColor,
      backgroundColor: theme.color.backgroundColor,
      borderRadius: theme.borders.radius1,
      paddingHorizontal: wp(3),
      height: hp(6),
      width: wp(80),
    },
    loadingView: { flex: 1, justifyContent: 'center', height: hp(80) },

    tagInputContainer: {
      // width: wp(88),
      height: hp(6),
      alignSelf: 'center',
      marginVertical: hp(0.5),
    },
    updateBtn: {
      height: hp(5.2),
      width: wp(88),
      marginVertical: hp(2),
      backgroundColor: theme.color.primaryColor,
      borderRadius: theme.borders.radius4,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },

    updateText: {
      color: theme.color.whiteText,
      fontFamily: theme.family.semibold,
      fontSize: hp(1.6),
    },
    modalView: {
      width: wp(70),
      backgroundColor: theme.color.whiteBackground,
      alignSelf: 'center',
      borderRadius: theme.borders.radius2,
      padding: wp(5),
      alignItems: 'center',
    },

    textDelete: {
      color: theme.color.primaryColor,
      fontFamily: theme.family.bold,
      fontSize: theme.size.medium,
    },
    textAlert: {
      marginTop: hp(1),
      fontSize: theme.size.small,
      textAlign: 'center',
    },
    deleteBtn: {
      borderColor: theme.color.primaryColor,
      borderWidth: 1,
      backgroundColor: theme.color.whiteText,
      height: hp(5),
      marginTop: hp(3),
    },
    deleteText: {
      color: theme.color.primaryColor,
    },
    ignoreButton: {
      backgroundColor: theme.color.primaryColor,

      height: hp(5),
      marginTop: hp(2),
    },
    ignoreText: {
      color: theme.color.whiteText,
    },
    selectedList: {
      marginTop: hp(1),
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: wp(85),
      paddingHorizontal: wp(3),
      paddingVertical: hp(1.5),
      alignSelf: 'center',
      borderColor: theme.color.borderColor,
      borderRadius: theme.borders.radius1,
      borderWidth: 1,
      alignContent: 'center',
      alignItems: 'center',
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

    btnText: {
      marginTop: hp(1.5),
      height: hp(5.3),
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
      paddingRight: wp(4),
      marginRight: wp(1),
      backgroundColor: theme.color.inputFieldColor,
      borderRadius: theme.borders.radius4,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderWidth: 0.5,
      borderColor: theme.color.inputFieldColor,
    },
    selectedView: {
      marginTop: hp(1.5),
      height: hp(5.3),
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
      paddingRight: wp(4),
      marginRight: wp(1),
      backgroundColor: theme.color.primaryColor,
      borderRadius: theme.borders.radius4,
      borderWidth: 0.5,
      borderColor: theme.color.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    titleText: {
      fontSize: hp(1.6),
      fontFamily: theme.family.semibold,
      textAlign: 'center',
      color: theme.color.blackText,
    },
    selectedText: {
      fontSize: hp(1.6),
      color: theme.color.whiteText,
      fontFamily: theme.family.semibold,
      textAlign: 'center',
    },
  });
  return styles;
};
export default createStyles;
