import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    lowRisk: {
      flex: 1,
      backgroundColor: theme.color.riskLow,
    },
    moderateRisk: {
      flex: 1,
      backgroundColor: theme.color.riskModerate,
    },
    highRisk: {
      flex: 1,
      backgroundColor: theme.color.riskHigh,
    },
    containerStyle: { height: 0 },
    riskPercent: {
      fontSize: theme.size.xxxlarge,
      color: theme.color.whiteText,
      alignSelf: 'center',
      // fontFamily: theme.family.boldItalic,
    },
    riskText: {
      fontSize: theme.size.xxxlarge,
      color: theme.color.whiteText,
      alignSelf: 'center',
      fontFamily: theme.family.boldItalic,
    },
  });
  return styles;
};
export default createStyles;
