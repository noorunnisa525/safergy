import { useThemeAwareObject } from '@theme';
import { hp } from '@utils';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Header from '../../../components/Header';
import createStyles from './styles';

const RiskView = () => {
  const styles = useThemeAwareObject(createStyles);
  const [risk] = useState(76); // low, moderate or high
  return (
    <View
      style={
        risk <= 20
          ? styles.highRisk
          : risk > 20 && risk <= 75
          ? styles.moderateRisk
          : styles.lowRisk
      }
    >
      <Header
        containerStyle={styles.containerStyle}
        statusbar={{
          backgroundColor:
            risk <= 20
              ? styles.highRisk.backgroundColor
              : risk > 20 && risk <= 75
              ? styles.moderateRisk.backgroundColor
              : styles.lowRisk.backgroundColor,
        }}
      />
      <Text style={[styles.riskText, { marginTop: hp(20) }]}>{risk}%</Text>
      <Text style={styles.riskText}>Risk</Text>
    </View>
  );
};

export default RiskView;
