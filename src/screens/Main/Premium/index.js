import { useThemeAwareObject } from '@theme';
import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import Text from './../../../components/Text';
import createStyles from './styles';

const Premium = props => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textTry}>TRY</Text>
      <Text style={styles.textSafergy}>SAFErgy</Text>
      <Text style={styles.textPremium}>Premium</Text>
      <Image
        resizeMode="contain"
        source={require('../../../../assets/icons/logo2.png')}
        style={styles.icon}
      />
      <Text
        onPress={() => {
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'TabNavigator' }],
          });
        }}
        style={styles.textClick}
      >
        COMING SOON
      </Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'TabNavigator' }],
          });
        }}
      >
        <Text style={styles.textReturn}>Return Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Premium;
